// jest.mock('axios', () => ({
//   get: jest.fn(() => new Promise((resolve) => {
//     resolve({
//       data: {
//         photos: {
//           photo: []
//         }
//       }
//     });
//   })),
//   post: jest.fn().mockImplementation(() => Promise.reject("")),
//   put: jest.fn()
// }));

const axios = {
  get: () => Promise.resolve({
    data: {
      photos: {
        photo: []
      }
    }
  }),
  post: jest.fn().mockImplementation(() => Promise.reject("")),
  put: jest.fn()
}

export default axios;