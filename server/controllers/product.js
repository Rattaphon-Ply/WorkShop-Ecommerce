const prisma = require("../config/prisma")
const cloudinary = require('cloudinary').v2;

// อย่าลืมเอาออกก่อนขึ้น git
// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.create = async(req,res)=>{
    try{
        const { title,description,price,quantity,categoryId,images } = req.body
        
        const product = await prisma.product.create({
            data:{
                title: title,
                description: description,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                categoryId: parseInt(categoryId),
                images: {
                    create: images.map((item)=> ({
                        asset_id:item.asset_id,
                        public_id:item.public_id,
                        url:item.url,
                        secure_url:item.secure_url
                    }))
                }
            }
        })

        res.send(product)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message : "Server error" })
    }
}

exports.list = async(req,res)=>{
    try{
        const { count } = req.params
        const products = await prisma.product.findMany({
            take: parseInt(count),
            orderBy: { createdAt : "desc" },
            include: {
                category:true,
                images:true
            }
        })
        res.send(products)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message : "Server error" })
    }
}

exports.read = async(req,res)=>{
    try{
        const { id } = req.params
        const products = await prisma.product.findFirst({
            where:{
                id: Number(id)
            },
            include: {
                category:true,
                images:true
            }
        })
        res.send(products)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message : "Server error" })
    }
}

exports.update = async(req,res)=>{
    try{
        const { title,description,price,quantity,categoryId,images } = req.body
        // console.log(title,description,price,quantity,images)

        // clear images
        await prisma.image.deleteMany({
            where:{
                productId: Number(req.params.id)
            }
        })

        const product = await prisma.product.update({
            where:{
                id: Number(req.params.id)
            },
            data:{
                title: title,
                description: description,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                categoryId: parseInt(categoryId),
                images: {
                    create: images.map((item)=> ({
                        asset_id:item.asset_id,
                        public_id:item.public_id,
                        url:item.url,
                        secure_url:item.secure_url
                    }))
                }
            }
        })

        res.send(product)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message : "Server error" })
    }
}

exports.remove = async(req,res)=>{
    try{
        const { id } = req.params

        // ต่อทีหลัง
        // Step 1 ค้นหาสินค้าเพิ่อ include images
        const product = await prisma.product.findFirst({
            where: { id: Number(id) },
            include: { images: true}
        })
        if(!product){
            return res.status(400).json({ message: 'Product not found!!!' })
        }
        // Step 2 Promise ลบรูปภาพใน cloud ลบแบบ รอฉันด้วย
        const deletedImage = product.images.map((image)=>
            new Promise((resolve, reject) => {
                // ลบจาก cloud
                cloudinary.uploader.destroy(image.public_id,(error, result)=>{
                    if(error){
                        reject(error)
                    } else {
                        resolve(result)
                    }
                })
            })
        )
        await Promise.all(deletedImage)

        // Step 3 ลบสินค้า
        await prisma.product.delete({
            where:{
                id: Number(id)
            }
        })

        res.send('Deleted Success')
    } catch(err) {
        console.log(err)
        res.status(500).json({ message : "Server error" })
    }
}

exports.listby = async(req,res)=>{
    try{
        const { sort, order, limit } = req.body
        const products = await prisma.product.findMany({
            take: limit,
            orderBy: { [sort]:order },
            include: { 
                category: true,
                images: true
            }
        })
        res.send(products)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message : "Server error" })
    }
}

exports.searchFilters = async(req,res)=>{
    try{
        const { query, category, price } = req.body
        const where = {};

        if (query) {
            where.title = {
                contains: query,
            };
        }
        if (category && category.length > 0) {
            where.categoryId = {
                in: category.map((id) => Number(id)),
            };
        }
        if (price && price.length === 2) {
            where.price = {
                gte: price[0],
                lte: price[1],
            };
        }

        const products = await prisma.product.findMany({
            where,
            include: {
                category: true,
                images: true,
            },
        });
        res.json(products);
    } catch(err) {
        console.log(err)
        res.status(500).json({ message : "Server error" })
    }
}

exports.createImages = async(req,res)=>{
    try {
        const result = await cloudinary.uploader.upload(req.body.image,{
            public_id: `Ply-${Date.now()}`,
            resource_type: 'auto',
            folder:'Ecom2025Frist'
        })
        res.send(result)
    }catch(err) {
        console.log(err)
        res.status(500).json({ message : "Server error" })
    }
}

exports.removeImage = async(req,res)=>{
    try {
        const { public_id } = req.body
        cloudinary.uploader.destroy(public_id,(result)=>{
            res.send('Remove Image Success!!!')
        })
    }catch(err) {
        console.log(err)
        res.status(500).json({ message : "Server error" })
    }
}


