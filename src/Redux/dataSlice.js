import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// First API: Fetch Posts
export const fetchPosts = createAsyncThunk(
  'data/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      return data.slice(0, 5);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Second API: Fetch Users
export const fetchUsers = createAsyncThunk(
  'data/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      return data.slice(0, 5);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    posts: [],
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    DELETE_USER: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    DELETE_POST:(state, action)=>{
        state.posts = state.posts.filter(post => post.id !== action.payload);
    }
    
  },
  extraReducers: (builder) => {
    builder
      // Posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dataSlice.reducer;

export const { DELETE_USER } = dataSlice.actions;
