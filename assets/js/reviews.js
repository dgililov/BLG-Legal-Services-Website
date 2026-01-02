/**
 * BLG Legal Services - Dynamic Reviews Loader
 * 
 * Fetches and displays reviews from Google Places API and Facebook Graph API
 * via backend proxy server.
 */

const REVIEWS_API_URL = 'http://localhost:3001';

/**
 * Initialize reviews when page loads
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('🔄 Loading reviews...');
  loadAllReviews();
});

/**
 * Fetch and display all reviews from both platforms
 */
async function loadAllReviews() {
  try {
    const response = await fetch(`${REVIEWS_API_URL}/api/all-reviews`);
    const result = await response.json();

    if (result.success) {
      // Display Google reviews
      if (result.data.google.success) {
        displayGoogleReviews(result.data.google.data);
      } else {
        showGoogleError();
      }

      // Display Facebook data
      if (result.data.facebook.success) {
        displayFacebookData(result.data.facebook.data);
      } else {
        showFacebookError();
      }
    }
  } catch (error) {
    console.error('Error loading reviews:', error);
    showConnectionError();
  }
}

/**
 * Display Google reviews in the UI
 */
function displayGoogleReviews(data) {
  const container = document.getElementById('google-reviews-container');
  if (!container) return;

  const { name, rating, user_ratings_total, reviews } = data;

  let html = `
    <div style="margin-bottom: 2rem; text-align: center;">
      <div style="display: inline-flex; align-items: center; gap: 1rem; padding: 1.5rem 2rem; background: linear-gradient(135deg, #4285F4 0%, #34A853 100%); border-radius: var(--radius-md); color: white;">
        <i class="fab fa-google" style="font-size: 2.5rem;"></i>
        <div style="text-align: left;">
          <div style="font-size: 2rem; font-weight: 700;">
            ${generateStars(rating)} ${rating.toFixed(1)}
          </div>
          <div style="font-size: 0.9rem; opacity: 0.95; margin-top: 0.25rem;">
            Based on ${user_ratings_total} Google Reviews
          </div>
        </div>
      </div>
    </div>
  `;

  if (reviews && reviews.length > 0) {
    html += '<div style="display: grid; gap: 1.5rem; margin-top: 2rem;">';
    
    reviews.forEach(review => {
      html += `
        <div style="background: white; padding: 2rem; border-radius: var(--radius-md); box-shadow: var(--shadow-md); border-left: 4px solid #4285F4;">
          <div style="display: flex; align-items: start; gap: 1rem; margin-bottom: 1rem;">
            <img src="${review.profile_photo_url}" 
                 alt="${review.author_name}" 
                 style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;">
            <div style="flex: 1;">
              <div style="font-weight: 600; font-size: 1.1rem; margin-bottom: 0.25rem;">
                ${review.author_name}
              </div>
              <div style="color: #fbbf24; font-size: 1.25rem; margin-bottom: 0.5rem;">
                ${generateStars(review.rating)}
              </div>
              <div style="font-size: 0.9rem; color: var(--text-secondary);">
                ${formatDate(review.time)}
              </div>
            </div>
          </div>
          <p style="color: var(--text-secondary); line-height: 1.6; margin: 0;">
            ${review.text}
          </p>
        </div>
      `;
    });
    
    html += '</div>';
  }

  container.innerHTML = html;
  console.log('✅ Google reviews loaded');
}

/**
 * Display Facebook page data in the UI
 */
function displayFacebookData(data) {
  const container = document.getElementById('facebook-stats-container');
  if (!container) return;

  const { name, overall_star_rating, rating_count, fan_count, link } = data;

  let html = '';

  if (overall_star_rating) {
    html += `
      <div style="margin-bottom: 2rem; text-align: center;">
        <div style="display: inline-flex; align-items: center; gap: 1rem; padding: 1.5rem 2rem; background: linear-gradient(135deg, #4267B2 0%, #385898 100%); border-radius: var(--radius-md); color: white;">
          <i class="fab fa-facebook" style="font-size: 2.5rem;"></i>
          <div style="text-align: left;">
            <div style="font-size: 2rem; font-weight: 700;">
              ${generateStars(overall_star_rating)} ${overall_star_rating.toFixed(1)}
            </div>
            <div style="font-size: 0.9rem; opacity: 0.95; margin-top: 0.25rem;">
              ${rating_count} ${rating_count === 1 ? 'Rating' : 'Ratings'} on Facebook
            </div>
          </div>
        </div>
      </div>
    `;
  }

  html += `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 2rem;">
      <div style="background: linear-gradient(135deg, #4267B2 0%, #385898 100%); padding: 2rem; border-radius: var(--radius-md); color: white; text-align: center;">
        <i class="fas fa-users" style="font-size: 2.5rem; margin-bottom: 1rem;"></i>
        <div style="font-size: 2rem; font-weight: 700;">${formatNumber(fan_count)}</div>
        <div style="font-size: 0.9rem; opacity: 0.9; margin-top: 0.5rem;">Facebook Followers</div>
      </div>
      ${overall_star_rating ? `
      <div style="background: linear-gradient(135deg, #34A853 0%, #0F9D58 100%); padding: 2rem; border-radius: var(--radius-md); color: white; text-align: center;">
        <i class="fas fa-star" style="font-size: 2.5rem; margin-bottom: 1rem;"></i>
        <div style="font-size: 2rem; font-weight: 700;">${overall_star_rating.toFixed(1)}</div>
        <div style="font-size: 0.9rem; opacity: 0.9; margin-top: 0.5rem;">Average Rating</div>
      </div>
      ` : ''}
    </div>
  `;

  container.innerHTML = html;
  console.log('✅ Facebook data loaded');
}

/**
 * Generate star rating HTML
 */
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  let stars = '';
  
  for (let i = 0; i < fullStars; i++) {
    stars += '⭐';
  }
  if (hasHalfStar) {
    stars += '⭐';
  }
  
  return stars;
}

/**
 * Format Unix timestamp to readable date
 */
function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

/**
 * Format number with commas
 */
function formatNumber(num) {
  return num.toLocaleString();
}

/**
 * Show error message for Google reviews
 */
function showGoogleError() {
  const container = document.getElementById('google-reviews-container');
  if (!container) return;

  container.innerHTML = `
    <div style="background: #fee; padding: 2rem; border-radius: var(--radius-md); border-left: 4px solid #dc2626; text-align: center;">
      <i class="fas fa-exclamation-circle" style="font-size: 3rem; color: #dc2626; margin-bottom: 1rem;"></i>
      <h3 style="color: #dc2626; margin-bottom: 1rem;">Unable to Load Google Reviews</h3>
      <p style="color: #7f1d1d; margin-bottom: 1.5rem;">
        Please ensure the backend API server is running and configured correctly.
      </p>
      <a href="https://share.google/s40cWxPEXkNv8HFld" target="_blank" class="btn btn-primary">
        <i class="fab fa-google"></i> View Reviews on Google
      </a>
    </div>
  `;
}

/**
 * Show error message for Facebook data
 */
function showFacebookError() {
  const container = document.getElementById('facebook-stats-container');
  if (!container) return;

  container.innerHTML = `
    <div style="background: #eef; padding: 2rem; border-radius: var(--radius-md); border-left: 4px solid #3b82f6; text-align: center;">
      <i class="fas fa-info-circle" style="font-size: 3rem; color: #3b82f6; margin-bottom: 1rem;"></i>
      <h3 style="color: #1e40af; margin-bottom: 1rem;">Unable to Load Facebook Data</h3>
      <p style="color: #1e3a8a; margin-bottom: 1.5rem;">
        Please ensure the backend API server is running and Facebook access token is configured.
      </p>
      <a href="https://www.facebook.com/blglegalservices/" target="_blank" class="btn btn-primary">
        <i class="fab fa-facebook"></i> Visit Our Facebook Page
      </a>
    </div>
  `;
}

/**
 * Show connection error
 */
function showConnectionError() {
  const message = `
    <div style="background: #fef3c7; padding: 2rem; border-radius: var(--radius-md); border-left: 4px solid #f59e0b; text-align: center; margin: 2rem auto; max-width: 600px;">
      <i class="fas fa-server" style="font-size: 3rem; color: #d97706; margin-bottom: 1rem;"></i>
      <h3 style="color: #92400e; margin-bottom: 1rem;">Backend Server Not Running</h3>
      <p style="color: #78350f; margin-bottom: 1.5rem;">
        The reviews API server needs to be started to display dynamic reviews.
      </p>
      <div style="background: white; padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1rem; text-align: left;">
        <strong style="color: #92400e;">To start the server:</strong>
        <pre style="background: #1f2937; color: #10b981; padding: 1rem; border-radius: var(--radius-sm); margin-top: 0.5rem; overflow-x: auto;">cd backend
npm install
npm start</pre>
      </div>
      <p style="font-size: 0.9rem; color: #78350f;">
        Once the server is running on port 3001, refresh this page.
      </p>
    </div>
  `;

  const googleContainer = document.getElementById('google-reviews-container');
  const facebookContainer = document.getElementById('facebook-stats-container');
  
  if (googleContainer) googleContainer.innerHTML = message;
  if (facebookContainer) facebookContainer.innerHTML = '';
}

