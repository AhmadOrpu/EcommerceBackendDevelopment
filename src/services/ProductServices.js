const BrandModel = require('../models/BrandModel.js');
const CategoryModel = require('../models/CategoryModel.js');
const ProductModel = require('../models/ProductModel.js');
const ProductDetailsModel = require('../models/ProductDetailsModel.js');
const ProductSliderModel = require('../models/ProductSliderModel.js');
const ReviewModel = require('../models/ReviewModel.js');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


const BrandListService =async()=>{

    try {
        let data = await BrandModel.find();
        return {status:"Success", data: data};
    } 
    catch (error) {
        return {status:"Failed", data:error}.toString();
    }

};

const CategoryListService =async()=>{
    try {
        let data = await CategoryModel.find();
        return {status:"Success", data: data};
    } 
    catch (error) {
        return {status:"Failed", data:error}.toString();
    }
};

const SliderListService =async()=>{
    try {
        let data = await ProductSliderModel.find();
        return {status:"Success", data:data};
    } 
    catch (error) {
        return {status:"Failed", data:error}.toString();
    }
};



const ListByBrandService =async(req)=>{
    try {
        let BrandID = new ObjectId(req.params.BrandID);
    let MatchStage={$match:{brandID:BrandID}};
    let JoinWithBrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
    let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
    let UnwindBrandStage ={$unwind:"$brand"};
    let UnwindCategoryStage ={$unwind:"$category"};

    let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}


    let data = await ProductModel.aggregate([
        MatchStage,
        JoinWithBrandStage,
        JoinWithCategoryStage,
        UnwindBrandStage,UnwindCategoryStage,ProjectionStage
    ])
    return {status:"Success", data:data};
    
    } catch (error) {
        return {status:"Failed", data:error}.toString();
    }
};


const ListByCategoryService =async(req)=>{

    try {
    let CategoryID = new ObjectId(req.params.CategoryID);
    let MatchStage={$match:{categoryID:CategoryID}};

    let JoinWithBrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
    let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
    let UnwindBrandStage ={$unwind:"$brand"};
    let UnwindCategoryStage ={$unwind:"$category"};

    let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}


    let data = await ProductModel.aggregate([
        MatchStage,
        JoinWithBrandStage,
        JoinWithCategoryStage,
        UnwindBrandStage,
        UnwindCategoryStage,
        ProjectionStage
    ])
    return {status:"Success", data:data};
    } catch (error) {
        return {status:"Failed", data:error}.toString();
    }
};

const ListByRemarkService =async(req)=>{

    try {
    let Remark = req.params.Remark;
    let MatchStage={$match:{remark:Remark}};

    let JoinWithBrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
    let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
    let UnwindBrandStage ={$unwind:"$brand"};
    let UnwindCategoryStage ={$unwind:"$category"};

    let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}


    let data = await ProductModel.aggregate([
        MatchStage,
        JoinWithBrandStage,JoinWithCategoryStage,
        UnwindBrandStage,UnwindCategoryStage,ProjectionStage
    ])
    return {status:"Success", data:data};
    } catch (error) {
        return {status:"Failed", data:error}.toString();
    }
};



const ListBySmilerService =async(req)=>{

    try {
    let CategoryID = new ObjectId(req.params.CategoryID);
    let MatchStage = {$match:{categoryID:CategoryID}};
    let limitStage = {$limit:20};

    let JoinWithBrandStage = {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
    let JoinWithCategoryStage = {$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
    let UnwindBrandStage = {$unwind:"$brand"};
    let UnwindCategoryStage = {$unwind:"$category"};

    let ProjectionStage = {$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

    let data = await ProductModel.aggregate([
        MatchStage,limitStage,JoinWithBrandStage,JoinWithCategoryStage,
        UnwindBrandStage,UnwindCategoryStage,ProjectionStage
    ])
    return {status:"Success", data:data};
    } catch (error) {
        return {status:"Failed", data:error}.toString();
    }
};

const DetailsService =async(req)=>{
    try {
        let ProductID = new ObjectId(req.params.ProductID);
        let MatchStage={$match:{_id:ProductID}};
        let JoinWithBrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let JoinWithDetailsStage={$lookup:{from:"productdetails",localField:"_id",foreignField:"productID",as:"details"}};

        let UnwindBrandStage ={$unwind:"$brand"};
        let UnwindCategoryStage ={$unwind:"$category"};
        let UnwindDetailsStage ={$unwind:"$details"};
    
        let ProjectionStage = {$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

        let data = await ProductModel.aggregate([
            MatchStage,JoinWithBrandStage,JoinWithCategoryStage,JoinWithDetailsStage,UnwindBrandStage,UnwindCategoryStage,UnwindDetailsStage,ProjectionStage
        ])
        return {status:"Success", data:data};
        }
        catch (error) {
            return {status:"Failed", data:error}.toString();
        }
};


const ListByKeywordService =async(req)=>{
    try {
    let SearchRegex = {"$regex":req.params.Keyword,"$options":"i"};
    let SearchParams =[{title:SearchRegex},{shortDes:SearchRegex}];
    let SearchQuery = {$or:SearchParams};

    let MatchStage = {$match:SearchQuery};

    let JoinWithBrandStage = {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
    let JoinWithCategoryStage = {$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
    let UnwindBrandStage = {$unwind:"$brand"};
    let UnwindCategoryStage = {$unwind:"$category"};
    let ProjectionStage = {$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

    let data = await ProductModel.aggregate([
        MatchStage,JoinWithBrandStage,JoinWithCategoryStage,
        UnwindBrandStage,UnwindCategoryStage,ProjectionStage
    ])
    return {status:"Success", data:data};
    } catch (error) {
        return {status:"Failed", data:error}.toString();
    }
};


const ReviewListService =async(req)=>{
    try {
        let ProductID = new ObjectId(req.params.ProductID);
        let MatchStage ={$match:{productID:ProductID}};

        let JoinWithProfileStage = {$lookup:{from:"profiles",localField:"userID",foreignField:"userID",as:"profile"}};
        let UnwindProfileStage = {$unwind:"$profile"};

        let ProjectionStage = {$project:{'des':1,'rating':1,'profile.cus_name':1
        }}


        let data = await ReviewModel.aggregate([
            MatchStage,JoinWithProfileStage,UnwindProfileStage,ProjectionStage
        ])
        return {status:"Success", data:data};
    }
    catch (error) {
        return {status:"Failed", data:error}.toString();
    }
};



module.exports={BrandListService,CategoryListService,SliderListService,
    ListByBrandService,ListByCategoryService,ListByRemarkService,ListBySmilerService,ListByKeywordService,DetailsService,ReviewListService
};