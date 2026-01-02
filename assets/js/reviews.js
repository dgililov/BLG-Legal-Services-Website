/**
 * BLG Legal Services - Dynamic Reviews Loader
 * 
 * Fetches and displays reviews from Google Places API and Facebook Graph API
 * via backend proxy server.
 * 
 * Version: 2.0.0
 * Updated: January 2, 2026
 */

// Configuration
const CONFIG = {
  apiUrl: 'http://localhost:3001',
  googleReviewsUrl: 'https://share.google/s40cWxPEXkNv8HFld',
  facebookPageUrl: 'https://www.facebook.com/blglegalservices/',
  retryAttempts: 2,
  retryDelay: 1000,
  timeout: 10000
};

// State
let isLoading = false;
let retryCount = 0;

/**
 * Initialize reviews when page loads
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('🔄 Initializing reviews loader...');
  loadAllReviews();
});

/**
 * Fetch with timeout
 */
async function fetchWithTimeout(url, options = {}, timeout = CONFIG.timeout) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

/**
 * Fetch and display all reviews from both platforms
 */
async function loadAllReviews() {
  if (isLoading) return;
  isLoading = true;

  try {
    const response = await fetchWithTimeout(`${CONFIG.apiUrl}/api/all-reviews`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();

    if (result.success) {
      // Display Google reviews
      if (result.data.google && result.data.google.success) {
        displayGoogleReviews(result.data.google.data);
      } else {
        showGoogleFallback(result.data.google?.error || 'Not available');
      }

      // Display Facebook data
      if (result.data.facebook && result.data.facebook.success) {
        displayFacebookData(result.data.facebook.data);
      } else {
        showFacebookFallback(result.data.facebook?.error || 'Not available');
      }
    } else {
      throw new Error(result.error || 'Unknown error');
    }
  } catch (error) {
    console.error('Error loading reviews:', error);
    
    // Retry logic
    if (retryCount < CONFIG.retryAttempts) {
      retryCount++;
      console.log(`Retrying... (attempt ${retryCount}/${CONFIG.retryAttempts})`);
      setTimeout(() => {
        isLoading = false;
        loadAllReviews();
      }, CONFIG.retryDelay);
      return;
    }
    
    showConnectionError();
  } finally {
    isLoading = false;
  }
}

/**
 * Display Google reviews in the UI
 */
function displayGoogleReviews(data) {
  const container = document.getElementById('google-reviews-container');
  if (!container) return;

  const { name, rating, user_ratings_total, reviews, formatted_address, url } = data;

  let html = `
    <div class="reviews-header" style="margin-bottom: 2rem; text-align: center;">
      <div style="display: inline-flex; align-items: center; gap: 1rem; padding: 1.5rem 2.5rem; background: linear-gradient(135deg, #4285F4 0%, #34A853 50%, #FBBC05 100%); border-radius: 16px; color: white; box-shadow: 0 4px 20px rgba(66, 133, 244, 0.3);">
        <i class="fab fa-google" style="font-size: 2.5rem;"></i>
        <div style="text-align: left;">
          <div style="font-size: 2.5rem; font-weight: 700; line-height: 1;">
            ${generateStars(rating)} <span style="margin-left: 0.5rem;">${rating.toFixed(1)}</span>
          </div>
          <div style="font-size: 1rem; opacity: 0.95; margin-top: 0.5rem;">
            Based on ${user_ratings_total.toLocaleString()} Google Reviews
          </div>
        </div>
      </div>
    </div>
  `;

  if (reviews && reviews.length > 0) {
    html += '<div class="reviews-grid" style="display: grid; gap: 1.5rem; margin-top: 2rem;">';
    
    reviews.forEach((review, index) => {
      const animationDelay = index * 0.1;
      html += `
        <div class="review-card" style="background: white; padding: 1.5rem 2rem; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); border-left: 4px solid #4285F4; transition: transform 0.2s, box-shadow 0.2s; animation: fadeInUp 0.5s ease forwards; animation-delay: ${animationDelay}s; opacity: 0;">
          <div style="display: flex; align-items: start; gap: 1rem; margin-bottom: 1rem;">
            <img src="${review.profile_photo_url || 'https://lh3.googleusercontent.com/a/default-user'}" 
                 alt="${escapeHtml(review.author_name)}" 
                 style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid #e5e7eb;"
                 onerror="this.src='https://lh3.googleusercontent.com/a/default-user'">
            <div style="flex: 1; min-width: 0;">
              <div style="font-weight: 600; font-size: 1.1rem; margin-bottom: 0.25rem; color: #1f2937;">
                ${escapeHtml(review.author_name)}
              </div>
              <div style="color: #fbbf24; font-size: 1.1rem; margin-bottom: 0.25rem;">
                ${generateStars(review.rating)}
              </div>
              <div style="font-size: 0.875rem; color: #6b7280;">
                ${formatRelativeTime(review.time)}
              </div>
            </div>
            <a href="${review.author_url}" target="_blank" rel="noopener noreferrer" 
               style="color: #4285F4; font-size: 0.875rem; text-decoration: none; white-space: nowrap;"
               title="View on Google">
              <i class="fab fa-google"></i>
            </a>
          </div>
          <p style="color: #4b5563; line-height: 1.7; margin: 0; font-size: 0.95rem;">
            ${formatReviewText(review.text)}
          </p>
        </div>
      `;
    });
    
    html += '</div>';
  }

  // Add animation keyframes
  html += `
    <style>
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .review-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 20px rgba(0,0,0,0.12);
      }
    </style>
  `;

  container.innerHTML = html;
  console.log('✅ Google reviews loaded successfully');
}

/**
 * Display Facebook page data in the UI
 */
function displayFacebookData(data) {
  const container = document.getElementById('facebook-stats-container');
  if (!container) return;

  const page = data.page || data;
  const ratings = data.ratings || [];
  const { name, overall_star_rating, rating_count, fan_count, link, about } = page;

  let html = '';

  // Stats cards
  html += `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1.5rem;">
  `;

  // Followers card
  if (fan_count) {
    html += `
      <div style="background: linear-gradient(135deg, #4267B2 0%, #385898 100%); padding: 2rem; border-radius: 16px; color: white; text-align: center; box-shadow: 0 4px 20px rgba(66, 103, 178, 0.3);">
        <i class="fas fa-users" style="font-size: 2rem; margin-bottom: 0.75rem; opacity: 0.9;"></i>
        <div style="font-size: 2rem; font-weight: 700;">${formatNumber(fan_count)}</div>
        <div style="font-size: 0.9rem; opacity: 0.9; margin-top: 0.25rem;">Facebook Followers</div>
      </div>
    `;
  }

  // Rating card (if available)
  if (overall_star_rating) {
    html += `
      <div style="background: linear-gradient(135deg, #34A853 0%, #0F9D58 100%); padding: 2rem; border-radius: 16px; color: white; text-align: center; box-shadow: 0 4px 20px rgba(15, 157, 88, 0.3);">
        <i class="fas fa-star" style="font-size: 2rem; margin-bottom: 0.75rem; opacity: 0.9;"></i>
        <div style="font-size: 2rem; font-weight: 700;">${overall_star_rating.toFixed(1)} / 5</div>
        <div style="font-size: 0.9rem; opacity: 0.9; margin-top: 0.25rem;">${rating_count || 0} Ratings</div>
      </div>
    `;
  }

  // Recommendations card
  html += `
    <div style="background: linear-gradient(135deg, #E1306C 0%, #C13584 100%); padding: 2rem; border-radius: 16px; color: white; text-align: center; box-shadow: 0 4px 20px rgba(193, 53, 132, 0.3);">
      <i class="fas fa-thumbs-up" style="font-size: 2rem; margin-bottom: 0.75rem; opacity: 0.9;"></i>
      <div style="font-size: 1.5rem; font-weight: 700;">Recommended</div>
      <div style="font-size: 0.9rem; opacity: 0.9; margin-top: 0.25rem;">by our clients</div>
    </div>
  `;

  html += '</div>';

  // Display Facebook reviews/recommendations if available
  if (ratings && ratings.length > 0) {
    html += `
      <div style="margin-top: 2rem;">
        <h4 style="margin-bottom: 1rem; color: #1f2937;">Recent Recommendations</h4>
        <div style="display: grid; gap: 1rem;">
    `;
    
    ratings.slice(0, 5).forEach(review => {
      const reviewerName = review.reviewer?.name || 'Facebook User';
      const reviewText = review.review_text || (review.recommendation_type === 'positive' ? 'Recommends this business' : '');
      
      if (reviewText) {
        html += `
          <div style="background: #f8fafc; padding: 1.25rem; border-radius: 12px; border-left: 4px solid #4267B2;">
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
              <i class="fab fa-facebook" style="color: #4267B2; font-size: 1.25rem;"></i>
              <span style="font-weight: 600; color: #1f2937;">${escapeHtml(reviewerName)}</span>
              ${review.recommendation_type === 'positive' ? '<span style="color: #10b981; font-size: 0.875rem;"><i class="fas fa-check-circle"></i> Recommends</span>' : ''}
            </div>
            <p style="color: #4b5563; margin: 0; line-height: 1.6;">${escapeHtml(reviewText)}</p>
          </div>
        `;
      }
    });
    
    html += '</div></div>';
  }

  container.innerHTML = html;
  console.log('✅ Facebook data loaded successfully');
}

/**
 * Generate star rating HTML
 */
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  let stars = '';
  
  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star" style="color: #fbbf24;"></i>';
  }
  if (hasHalfStar) {
    stars += '<i class="fas fa-star-half-alt" style="color: #fbbf24;"></i>';
  }
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="far fa-star" style="color: #fbbf24;"></i>';
  }
  
  return stars;
}

/**
 * Format Unix timestamp to relative time
 */
function formatRelativeTime(timestamp) {
  const date = new Date(timestamp * 1000);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
  return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) > 1 ? 's' : ''} ago`;
}

/**
 * Format number with appropriate suffix
 */
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toLocaleString();
}

/**
 * Format review text with expandable content
 */
function formatReviewText(text) {
  if (!text) return '';
  const escaped = escapeHtml(text);
  if (escaped.length > 300) {
    return escaped.substring(0, 300) + '...';
  }
  return escaped;
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Show Google reviews fallback
 */
function showGoogleFallback(reason) {
  const container = document.getElementById('google-reviews-container');
  if (!container) return;

  console.log('Google reviews fallback:', reason);

  container.innerHTML = `
    <div style="text-align: center; padding: 3rem 2rem;">
      <div style="display: inline-flex; align-items: center; justify-content: center; width: 80px; height: 80px; background: linear-gradient(135deg, #4285F4 0%, #34A853 100%); border-radius: 50%; margin-bottom: 1.5rem;">
        <i class="fab fa-google" style="font-size: 2.5rem; color: white;"></i>
      </div>
      <h3 style="color: #1f2937; margin-bottom: 0.75rem;">View Our Google Reviews</h3>
      <p style="color: #6b7280; margin-bottom: 1.5rem; max-width: 400px; margin-left: auto; margin-right: auto;">
        See what our clients are saying about their experience with BLG Legal Services on Google.
      </p>
      <a href="${CONFIG.googleReviewsUrl}" target="_blank" rel="noopener noreferrer" 
         class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem;">
        <i class="fab fa-google"></i> View on Google
      </a>
    </div>
  `;
}

/**
 * Show Facebook fallback
 */
function showFacebookFallback(reason) {
  const container = document.getElementById('facebook-stats-container');
  if (!container) return;

  console.log('Facebook fallback:', reason);

  container.innerHTML = `
    <div style="text-align: center; padding: 3rem 2rem;">
      <div style="display: inline-flex; align-items: center; justify-content: center; width: 80px; height: 80px; background: linear-gradient(135deg, #4267B2 0%, #385898 100%); border-radius: 50%; margin-bottom: 1.5rem;">
        <i class="fab fa-facebook-f" style="font-size: 2.5rem; color: white;"></i>
      </div>
      <h3 style="color: #1f2937; margin-bottom: 0.75rem;">Connect With Us on Facebook</h3>
      <p style="color: #6b7280; margin-bottom: 1.5rem; max-width: 400px; margin-left: auto; margin-right: auto;">
        Follow our Facebook page for updates, success stories, and immigration news.
      </p>
      <a href="${CONFIG.facebookPageUrl}" target="_blank" rel="noopener noreferrer" 
         class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; background: #4267B2; border-color: #4267B2;">
        <i class="fab fa-facebook-f"></i> Visit Facebook Page
      </a>
    </div>
  `;
}

/**
 * Show connection error
 */
function showConnectionError() {
  const googleContainer = document.getElementById('google-reviews-container');
  const facebookContainer = document.getElementById('facebook-stats-container');

  const googleHtml = `
    <div style="text-align: center; padding: 3rem 2rem;">
      <div style="display: inline-flex; align-items: center; justify-content: center; width: 80px; height: 80px; background: linear-gradient(135deg, #4285F4 0%, #34A853 100%); border-radius: 50%; margin-bottom: 1.5rem;">
        <i class="fab fa-google" style="font-size: 2.5rem; color: white;"></i>
      </div>
      <h3 style="color: #1f2937; margin-bottom: 0.75rem;">Google Reviews</h3>
      <p style="color: #6b7280; margin-bottom: 1.5rem;">
        Click below to see our client reviews on Google.
      </p>
      <a href="${CONFIG.googleReviewsUrl}" target="_blank" rel="noopener noreferrer" 
         class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem;">
        <i class="fab fa-google"></i> View Google Reviews
      </a>
    </div>
  `;

  const facebookHtml = `
    <div style="text-align: center; padding: 3rem 2rem;">
      <div style="display: inline-flex; align-items: center; justify-content: center; width: 80px; height: 80px; background: #4267B2; border-radius: 50%; margin-bottom: 1.5rem;">
        <i class="fab fa-facebook-f" style="font-size: 2.5rem; color: white;"></i>
      </div>
      <h3 style="color: #1f2937; margin-bottom: 0.75rem;">Facebook Page</h3>
      <p style="color: #6b7280; margin-bottom: 1.5rem;">
        Follow us on Facebook for updates and success stories.
      </p>
      <a href="${CONFIG.facebookPageUrl}" target="_blank" rel="noopener noreferrer" 
         class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; background: #4267B2; border-color: #4267B2;">
        <i class="fab fa-facebook-f"></i> Visit Facebook Page
      </a>
    </div>
  `;

  if (googleContainer) googleContainer.innerHTML = googleHtml;
  if (facebookContainer) facebookContainer.innerHTML = facebookHtml;
  
  console.log('⚠️ Showing fallback links (API server not available)');
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    loadAllReviews,
    displayGoogleReviews,
    displayFacebookData,
    formatRelativeTime,
    formatNumber,
    generateStars
  };
}
