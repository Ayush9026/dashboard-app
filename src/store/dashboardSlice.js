import { createSlice } from '@reduxjs/toolkit';
import { initialDashboardData } from '../data/dashboardData.js';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    categories: initialDashboardData.categories,
    searchTerm: '',
    isAddWidgetModalOpen: false,
    selectedCategory: null
  },
  reducers: {
    addWidget: (state, action) => {
      const { categoryId, widget } = action.payload;
      console.log('Redux addWidget reducer called with:', { categoryId, widget });
      const category = state.categories.find(cat => cat.id === categoryId);
      console.log('Found category:', category);
      if (category) {
        const newWidget = {
          id: `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: widget.name,
          text: widget.text,
          type: 'custom'
        };
        console.log('Adding new widget:', newWidget);
        category.widgets.push(newWidget);
        console.log('Category widgets after add:', category.widgets);
      } else {
        console.error('Category not found:', categoryId);
      }
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter(widget => widget.id !== widgetId);
      }
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    toggleAddWidgetModal: (state, action) => {
      state.isAddWidgetModalOpen = !state.isAddWidgetModalOpen;
      state.selectedCategory = action.payload || null;
    }
  }
});

export const { addWidget, removeWidget, setSearchTerm, toggleAddWidgetModal } = dashboardSlice.actions;
export default dashboardSlice.reducer;