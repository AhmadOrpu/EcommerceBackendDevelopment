const express = require('express');
const ProductController = require('../controllers/ProductController.js');
const CartListController = require('../controllers/CartListController.js');
const UserController = require('../controllers/UserController.js');
const WishListController = require('../controllers/WishListController.js');

const AuthVerification = require('../middlewares/AuthVerification.js');

const router = express.Router();

//Product Related API
router.get('/ProductBrandList',ProductController.ProductBrandList);
router.get('/ProductCategoryList',ProductController.ProductCategoryList);
router.get('/ProductSliderList',ProductController.ProductSliderList);
router.get('/ProductListByBrand/:BrandID',ProductController.ProductListByBrand);
router.get('/ProductListByCategory/:CategoryID',ProductController.ProductListByCategory);
router.get('/ProductListBySmiler/:CategoryID',ProductController.ProductListBySmiler);
router.get('/ProductListByKeyword/:Keyword',ProductController.ProductListByKeyword);
router.get('/ProductListByRemark/:Remark',ProductController.ProductListByRemark);
router.get('/ProductDetails/:ProductID',ProductController.ProductDetails);
router.get('/ProductReviewList/:ProductID',ProductController.ProductReviewList);

//User Related API (With AUTH Verification)
router.get('/UserOTP/:email',UserController.UserOTP);
router.get('/VerifyLogin/:email/:otp',UserController.VerifyLogin);
router.get('/UserLogout',AuthVerification,UserController.UserLogout);

router.post('/CreateProfile',AuthVerification,UserController.CreateProfile);
router.post('/UpdateProfile',AuthVerification,UserController.UpdateProfile);
router.get('/ReadProfile',AuthVerification,UserController.ReadProfile);

//Wishlist Related API
router.post('/SaveWishList',AuthVerification,WishListController.SaveWishList);
router.post('/RemoveWishList',AuthVerification,WishListController.RemoveWishList);
router.get('/WishList',AuthVerification,WishListController.WishList);

//CartLIst Related API
router.post('/SaveCartList',AuthVerification,CartListController.SaveCartList);
router.post('/RemoveCartList',AuthVerification,CartListController.RemoveCartList);
router.get('/CartList',AuthVerification,CartListController.CartList);



module.exports =router;


