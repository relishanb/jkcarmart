import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from "next-redux-wrapper";

export const jsonServerApi = createApi({
  reducerPath: 'jsonServerApi',
  //baseQuery: fetchBaseQuery({ baseUrl: 'http://3.108.8.205/' }),
  baseQuery: fetchBaseQuery({ baseUrl: 'https://stagging.jkcarmart.com/' }),  

  tagTypes: ['postAd','updateAd', 'updateAdIsSold' , 'UpdateUserProfile', 'updateAdViews', 'updateDealerAds'],

  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },

  endpoints: (builder) => ({

    getAds: builder.query({
      query: (payload) => ({
        url: 'jkcm/Usedcars/getlist',
        method: 'POST',
        body: payload,
      }),     
      providesTags: ['updateAdViews'],  
    }),

    getAdImages: builder.query({      
      query: (carId) => `jkcm/Usedcars/GetImageUrlsByCarID/${carId}`,
    }),

    getAdDetailsByCarId: builder.query({      
      query: (carId) => `jkcm/Usedcars/GetCarListByCarID?carId=${carId}`,
      providesTags: ['updateAd','updateAdViews'],
    }),    

    getBrandsModelsVarients: builder.query({      
      query: () => 'api/Carbrand/Getbrandmodelslist',
    }),

    getBrands: builder.query({      
      query: () => 'api/Carbrand/Getbrandlist',
    }),

    getAllModels: builder.query({      
      query: () => 'api/Carmodel/GetAllCarmodels',
    }),

    getModels: builder.query({      
      query: (brandId) => `api/Carmodel/GetAllCarmodelsByBrandId?brandId=${brandId}`,
    }),

    getVariants: builder.query({      
      query: (modeldId) => `api/Carvariant/GetCarvariantByModelId/${modeldId}`,
    }),

    getLocations: builder.query({      
      query: () => `api/Districtmaster/GetAllDistrictmaster`,
    }),

    getBodyTypes: builder.query({      
      query: () => `api/Bodytypemaster/GetAllBodytypemaster`,
    }),

    getColors: builder.query({      
      query: () => `api/Carcolormaster/Getcolormasterlist`,
    }),

    getLoginDetails: builder.query({      
      query: (mobileNumber) => `jkcm-communications-Getotp?mobileno=${mobileNumber}`,
    }),

    getFakeLoginDetails: builder.query({      
      query: (mobileNumber) => `jkcm/users/Fakelogin?mobileno=${mobileNumber}`,
    }),

    getUserByUserId: builder.query({      
      query: (userId) => `jkcm/users/GetUserByUserId?userId=${userId}`, 
      providesTags: ['UpdateUserProfile'],    
    }),

    getUserAds: builder.query({      
      query: (userId) => `jkcm/Usedcars/GetCarListByUserID?userId=${userId}`,
      providesTags: ['postAd','updateAd', 'updateAdIsSold'],
     
    }),

    getDealers: builder.query({      
      query: (pageNumber) => `jkcm/adminpannel/GetAllCarUsers?userType=Car%20Dealer&pagenumber=${pageNumber}`,
      providesTags: ['updateDealerAds'],
    }),

    postAd: builder.mutation({
      query: (payload) => ({
        url: 'jkcm/Usedcars/InsertCarinfo',
        method: 'POST',
        body: payload,        
      }),    
      invalidatesTags: ['postAd'],  
    }),

    updateAd: builder.mutation({
      query: (payload) => ({
        url: 'jkcm/Usedcars/UpdateCarinfo',
        method: 'POST',
        body: payload,        
      }),      
      invalidatesTags: ['updateAd'],
    }),

    updateAdViews: builder.mutation({
      query: (carId) => ({
        url: `jkcm/Usedcars/UpdateCarViews?carid=${carId}`,
        method: 'POST',                
      }),   
      invalidatesTags: ['updateAdViews'],   
    }),

    UpdateSellerViews: builder.mutation({
      query: (userId) => ({
        url: `https://stagging.jkcarmart.com/jkcm/users/UpdateSellerViews?userid=${userId}`,
        method: 'POST',                
      }),      
    }),

    updateAdIsSold: builder.mutation({
      query: ({carId,isSold}) => ({
        url: `jkcm/Usedcars/updateIsSold?carid=${carId}&issold=${isSold}`,
        method: 'POST',                
      }),   
      invalidatesTags: ['updateAdIsSold'],        
    }),

    updateCarImages: builder.mutation({
      query: (payload) => ({
        url: `jkcm/Usedcars/UploadImage/upload?carid=${payload.carId}`,
        method: 'POST',
        body: payload.formData,            
      }),      
      invalidatesTags: ['updateAd','updateAdViews'],
    }),

    uploadMultiCarImages: builder.mutation({
      query: (payload) => ({
        url: `jkcm/Usedcars/UploadMultiCarImages/upload?carid=${payload.carId}`,
        method: 'POST',
        body: payload.formData,            
      }),      
      invalidatesTags: ['postAd'],
    }),

    deleteCarImage: builder.mutation({
      query: (payload) => ({
        url: `jkcm/Usedcars/DeleteImageByImageNameNCarID?carid=${payload.carId}&imagename=${payload.carImage}`,
        method: 'GET',                  
      }),      
      invalidatesTags: ['updateAd'],
    }),

    addUserAfterValidOTP: builder.mutation({
      query: (mobileNo) => ({
        url: '/jkcm/users/AddSellerWithMobile',
        method: 'POST',  
        body: {"mobileNo":mobileNo,isVerified:"true"},              
      }),      
    }),

    updateUserAfterValidOTP: builder.mutation({
      query: (mobileNo) => ({
        url: `jkcm/users/UpdateUserAfterValidOTP?mobileno=${mobileNo}`,
        method: 'POST',                
      }),      
    }),

    updateProfile: builder.mutation({
      query: (payload) => ({
        url: 'jkcm/users/UpdateUserProfile',
        method: 'POST',
        body: payload,        
      }),   
      invalidatesTags: ['UpdateUserProfile'],   
    }),

    updateBusinessImage: builder.mutation({
      query: (payload) => ({
        url: `jkcm/Usedcars/UploadDealerBusinessImage/upload?userid=${payload.userId}`,
        method: 'POST',
        body: payload.formData,            
      }),      
      invalidatesTags: ['UpdateUserProfile','updateDealerAds'],
    }),
    
    deleteBusinessImage: builder.mutation({
      query: (payload) => ({
        url: `jkcm/users/DeleteAllUserImagesByUserID?userid=${payload.userId}`,
        method: 'GET',                  
      }),      
      invalidatesTags: ['UpdateUserProfile','updateDealerAds'],
    }),




    postData:builder.mutation({
      query: (payload) => ({
        url: 'jkcm/users/ContactSeller',
        method: 'POST',
        body: payload,
      })
    })

  }),
});

export const {
  useGetAdsQuery,
  useGetAdImagesQuery,
  useGetAdDetailsByCarIdQuery,
  useGetBrandsModelsVarientsQuery,
  useGetBrandsQuery,
  useGetAllModelsQuery,
  useGetModelsQuery,
  useGetVariantsQuery,
  useGetLocationsQuery,
  useGetBodyTypesQuery,
  useGetColorsQuery,
  useGetLoginDetailsQuery,
  useGetFakeLoginDetailsQuery,
  useGetUserByUserIdQuery,
  useGetUserAdsQuery,
  useGetDealersQuery,
  usePostAdMutation,
  useUpdateAdMutation,
  useUpdateAdViewsMutation,
  useUpdateSellerViewsMutation,
  useUpdateAdIsSoldMutation,
  useUpdateCarImagesMutation,
  useUploadMultiCarImagesMutation,
  useDeleteCarImageMutation,
  useAddUserAfterValidOTPMutation,
  useUpdateUserAfterValidOTPMutation,
  useUpdateProfileMutation,
  useUpdateBusinessImageMutation,
  useDeleteBusinessImageMutation,

  usePostDataMutation,

  util: { getRunningQueriesThunk },  
} = jsonServerApi;

export const { getAdDetailsByCarId,getColors } = jsonServerApi.endpoints;