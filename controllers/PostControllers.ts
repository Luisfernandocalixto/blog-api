import Post from '../models/Posts';

export async function getAllPosts(req, res, next) {
    try {
        const posts = await Post.find();
        res.status(200).json({ posts });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
}

export async function getPostById(req, res, next) {
    const id = req.params.id;
    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post no encontrado" });
        }
        res.status(200).json({ post });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
}

export async function createPost(req, res, next) {
    const title = req.body.title;
    const content = req.body.content;
    

    if (!title) {
        return res.status(422).json({ err: 'Titulo es requerido!' });
    }
    if (!content) {
        return res.status(422).json({ err: 'Contenido es requerido!' });
    }

    const post = new Post({
        title,
        content
    });

    try {
        const savedPost = await post.save();
        res.status(200).json({ post: savedPost });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
}

export async function updatePost(req, res, next) {
    const id = req.params.id;
    try {
        const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ message: "Post no encontrado" });
        }
        res.status(200).json({ post: updatedPost });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
}

export async function deletePost(req, res, next) {
    const id = req.params.id;
    try {
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).json({ message: "Post no encontrado" });
        }
        res.status(200).json({ message: "Post eliminado con éxito", post: deletedPost });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
}
