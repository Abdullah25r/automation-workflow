import React, { useState, useEffect } from "react";
import axios from 'axios';
import { baseURL } from '../../Api/productapi';

function ProductReviews({ id }) {
  const productId = id;
  // State to hold comments fetched from the API
  const [comments, setComments] = useState([]);
  // State for loading and error messages
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // States for the new comment form
  const [newCommentText, setNewCommentText] = useState("");
  const [newCommenterName, setNewCommenterName] = useState("");
  // State to handle form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  // State for a submission success message
  const [submitMessage, setSubmitMessage] = useState(null);

  // Function to fetch comments for the specific product
  const fetchComments = async () => {
    setLoading(true);
    setError(null);
    try {
      // Using axios to fetch comments from your backend API
      const response = await axios.get(`${baseURL}/api/comments/${productId}`);
      // Update the comments state with the fetched data.
      // An empty response.data means no comments, which is handled gracefully.
      setComments(response.data);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
      // The error state is set to show the user a friendly message.
      setError("Failed to load comments. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // useEffect hook to call fetchComments when the component mounts or productId changes
  useEffect(() => {
    if (productId) {
      fetchComments();
    }
  }, [productId]);

  // Function to handle form submission and post a new comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    setSubmitMessage(null);

    if (!newCommentText.trim()) {
      setSubmitMessage({ type: 'error', text: 'Please enter a comment before submitting.' });
      return;
    }

    setIsSubmitting(true);
    try {
      const newCommentData = {
        product_id: productId,
        comment_text: newCommentText.trim(),
        commenter_name: newCommenterName.trim() || 'Anonymous'
      };

      // Using axios to post a new comment to your backend API
      const response = await axios.post(`${baseURL}/api/comments`, newCommentData);

      // Add the newly created comment from the API response to the local state
      // The '...' syntax is important here to preserve existing comments.
      setComments((prevComments) => [response.data, ...prevComments]);
      
      // Clear the form and set a success message
      setNewCommentText("");
      setNewCommenterName("");
      setSubmitMessage({ type: 'success', text: 'Your comment has been submitted!' });

    } catch (err) {
      console.error("Failed to post comment:", err);
      setSubmitMessage({ type: 'error', text: 'Failed to submit comment. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render states for a better user experience
  if (loading) {
    return <div className="text-gray-400 p-6 text-center">Loading reviews...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-6 text-center">{error}</div>;
  }

  return (
    <div className="comments-section text-white p-6 rounded-lg shadow-inner mt-8">
      <h3 className="text-2xl font-bold mb-6 text-white">
        Customer Reviews ({comments.length})
      </h3>
      <div className="comment-list mb-8 max-h-96 overflow-y-auto pr-2">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.comment_id} // Use comment_id from the database
              className="comment-item bg-[#1a1a1a] text-white p-4 rounded-md shadow-sm mb-4 border border-gray-700"
            >
              <p className="font-semibold text-white">{comment.commenter_name}</p>
              <p className="text-gray-300 mt-1">{comment.comment_text}</p>
              <p className="text-xs text-gray-400 mt-2">
                Posted on: {new Date(comment.created_at).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 italic">
            Be the first to leave a review!
          </p>
        )}
      </div>
      {submitMessage && (
        <div className={`p-3 rounded-md mb-4 ${
          submitMessage.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {submitMessage.text}
        </div>
      )}
      <div className="add-comment-form border-t pt-6 mt-6 border-gray-700">
        <h4 className="text-xl font-semibold mb-4 text-white">
          Leave a Review
        </h4>
        <form onSubmit={handleAddComment} className="space-y-4">
          <div>
            <label
              htmlFor="commentUser"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Your Name (Optional)
            </label>
            <input
              type="text"
              id="commentUser"
              className="w-full p-3 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white placeholder-gray-400"
              value={newCommenterName}
              onChange={(e) => setNewCommenterName(e.target.value)}
              placeholder="e.g., John Doe"
            />
          </div>
          <div>
            <label
              htmlFor="commentText"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Your Comment
            </label>
            <textarea
              id="commentText"
              className="w-full p-3 border border-gray-600 rounded-md resize-y min-h-[80px] focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white placeholder-gray-400"
              rows="4"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="Share your thoughts about this product..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full text-white py-3 px-4 border rounded-md transition duration-300 ease-in-out font-semibold ${
              isSubmitting
                ? "bg-gray-700 cursor-not-allowed border-gray-600 text-gray-400"
                : "bg-transparent border-[#64748b] hover:bg-[#ffffff] hover:text-black"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductReviews;
