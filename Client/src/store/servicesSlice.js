import { baseApiSlice } from "./baseApiSlice";
const SERVICES_URL = "/services";

export const servicesSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getService: builder.query({
      query: () => `${SERVICES_URL}`,
    }),
    getAllService: builder.query({
      query: (service) => `${SERVICES_URL}/allservice/${service}`,
    }),
    getAllServicesForSearch: builder.query({
      query: () => `${SERVICES_URL}/searchservice`,
    }),
    getMostSearchedVendors: builder.query({
      query: () => `${SERVICES_URL}/mostsearch`,
    }),
    getAllServiceByUserID: builder.query({
      query: (uid) => `${SERVICES_URL}/vendorservice/${uid}`,
    }),
    getServiceByID: builder.query({
      query: (id) => `${SERVICES_URL}/${id}`,
    }),
    createService: builder.mutation({
      query: (data) => {
        const body = new FormData();
    
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            if (Array.isArray(data[key])) {
              if (key === "addOns" || key === "eventType" ) {
                data[key].forEach((object, index) => {
                  if (key === "eventType") {
                    body.append(`${key}[${index}][title]`, object.title); // Assuming 'id' is a property of each event object
                    body.append(`${key}[${index}][price]`, object.price); // Assuming 'name' is a property of each event object
                    // Add other properties as needed
                  } else {
                    for (const objectKey in object) {
                      if (object.hasOwnProperty(objectKey)) {
                        body.append(
                          `${key}[${index}][${objectKey}]`,
                          object[objectKey]
                        );
                      }
                    }
                  }
                });
              } else {
                data[key].forEach((object, index) => {
                  body.append(`${key}[${index}]`, object);
                });
              }
              // If the property is an array of objects (like addOns or weddingType), manually append each object
            } else {
              // If it's not an array, append the single value
              body.append(key, data[key]);
            }
          }
        }
    
        return {
          url: `${SERVICES_URL}`,
          method: "POST",
          body,
        };
      },
    }),    
    deleteService: builder.mutation({
      query: (id) => ({
        url: `${SERVICES_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    updateServices: builder.mutation({
      query: ({ data, id }) => {
        const body = new FormData();
        // Loop through the keys in the data object
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            if (Array.isArray(data[key])) {
              if (key === "addOns" || key === "eventType") {
                data[key].forEach((object, index) => {
                  if (key === "eventType" ) {
                    body.append(`${key}[${index}][title]`, object.title); // Assuming 'id' is a property of each event object
                    body.append(`${key}[${index}][price]`, object.price); // Assuming 'name' is a property of each event object
                    // Add other properties as needed
                  } else {
                    for (const objectKey in object) {
                      if (object.hasOwnProperty(objectKey)) {
                        body.append(
                          `${key}[${index}][${objectKey}]`,
                          object[objectKey]
                        );
                      }
                    }
                  }
                });
              } else {
                data[key].forEach((object, index) => {
                  body.append(`${key}[${index}]`, object);
                });
              }
              // If the property is an array of objects (like addOns or weddingType), manually append each object
            } else {
              // If it's not an array, append the single value
              body.append(key, data[key]);
            }
          }
        }

        return {
          url: `${SERVICES_URL}/${id}`,
          method: "PUT",
          body,
        };
      },
    }),
  }),
});

export const {
  useGetServiceQuery,
  useGetAllServiceQuery,
  useGetAllServicesForSearchQuery,
  useGetMostSearchedVendorsQuery,
  useGetServiceByIDQuery,
  useGetAllServiceByUserIDQuery,
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useUpdateServicesMutation,
} = servicesSlice;
