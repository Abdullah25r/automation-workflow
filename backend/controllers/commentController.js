import { pool } from "../utils/pool.js";


export async function getCommentById(req,res) {
    const {id} = req.params;

    if(!id){
        return res.status(400).json({error:"product is required."})
    }

    try {
        const query = `SELECT * FROM comments WHERE product_id = $1 ORDER BY created_at DESC`;
        const {rows} = await pool.query(query,[id])

        res.status(200).json(rows)
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Failed to fetch comments.' });
    }
}

export async function createdComment(req,res) {
    const{product_id,comment_text, commenter_name} = req.body
    if (!product_id || !comment_text) {
        return res.status(400).json({ error: 'Product ID and comment text are required.' });
    }

    try {
        const query = `INSERT INTO comments  (product_id, comment_text, commenter_name) values ($1,$2,$3) RETURNING *`
        const values = [product_id, comment_text, commenter_name || 'Anonymous'];
        const {rows} = await pool.query(query, values)
        res.status(201).json(rows[0]);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Failed to create comment.' });
    }

}