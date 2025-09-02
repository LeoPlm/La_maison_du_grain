import Article from "../models/article.model.js"

export const getArticle = async(req,res,next) =>{
    try{
        const articles = await Article.find().populate('avis')
        res.status(200).json(articles)
    }catch(e){
        next(e)
    }
}

export const getArticleById = async(req,res,next) =>{
    try{
        const articles = await Article.findById(req.params.articleId).populate('avis')
        res.status(200).json(articles)
    }catch(e){
        next(e)
    }
}

export const getArticleByAscendingPrice = async (req,res,next) =>{
    try{
        const articleAsc = await Article.find().sort({price: 1})
        if(!articleAsc || articleAsc.length === 0) return res.status(404).json("No articles found")
        res.status(200).json(articleAsc)
    }catch(e){
        next(e)
    }
}

export const getArticleByDescendingPrice = async (req,res,next) =>{
    try{
        const artDesc = await Article.find().sort({price: -1})
        if(!artDesc || artDesc.length === 0) return res.status(404).json("No articles found")
            res.status(200).json(artDesc)
    }catch (e){
        next(e)
    }
}

export const addArticle = async (req, res, next) => {
    try {

        // Récupérer les images en utilisant Object.values pour aplatir les fichiers dans un tableau
        const images = Object.values(req.files).flat()

        // Crée un objet contenant les chemins des images
        const pathImgExtrated = {
            img: `/uploads/${images[0].filename}`,  // Première image obligatoire (img)
        };

        // Si d'autres images sont présentes, les ajouter dans img1, img2...
        for (let i = 1; i < images.length; i++) {
            pathImgExtrated[`img${i}`] = `/uploads/${images[i].filename}`;
        }

        const articleData = {
            ...req.body,
            picture: pathImgExtrated // Envoie l'objet `picture` avec les images
        };

        const newArticle = await Article.create(articleData)

        res.status(201).json({ message: "Article créé avec succès", article: newArticle })

    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Erreur lors de la création de l'article", details: err.message })
    }
}



export const updateArticle = async (req,res,next) =>{
    try{
        const updatedArticle = await Article.findByIdAndUpdate(req.params.articleId,{$set: req.body}, {new: true})
        if(!updatedArticle) return res.status(404).json("Article not found")
        return res.status(200).json({message: "article updated!", updatedArticle})
    } catch(e){
        next(e)
    }
}

export const deleteArticle = async (req, res, next) =>{
    try{
        const deleteArticle = await Article.findByIdAndDelete(req.params.articleId)
        if(!deleteArticle) return res.status(404).json("article not found")
        return res.status(200).json(`article ${req.params.articleId} has been deleted`)
    }catch(e){
        next(e)
    }
}