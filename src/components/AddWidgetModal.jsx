import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'lucide-react';
import { addWidget, removeWidget, toggleAddWidgetModal } from '../store/dashboardSlice.js';
import { widgetTemplates } from '../data/dashboardData.js';

const AddWidgetModal = () => {
  const dispatch = useDispatch();
  const { isAddWidgetModalOpen, selectedCategory, categories } = useSelector(state => state.dashboard);
  const [customWidget, setCustomWidget] = useState({ name: '', text: '' });
  const [selectedWidgets, setSelectedWidgets] = useState(new Set());
  const [widgetsToRemove, setWidgetsToRemove] = useState(new Set());

  // Map category IDs to tab names
  const categoryToTab = {
    'cspm': 'CSPM',
    'cwpp': 'CWPP', 
    'registry': 'Image',
    'ticket': 'Ticket'
  };

  // Set active tab based on selected category
  const [activeTab, setActiveTab] = useState(categoryToTab[selectedCategory] || 'CSPM');

  // Update active tab when selected category changes and clear previous selections
  useEffect(() => {
    if (selectedCategory && categoryToTab[selectedCategory]) {
      setActiveTab(categoryToTab[selectedCategory]);
      // Clear previous selections when switching categories
      setSelectedWidgets(new Set());
      setWidgetsToRemove(new Set());
    }
  }, [selectedCategory]);

  const handleClose = () => {
    dispatch(toggleAddWidgetModal());
    setCustomWidget({ name: '', text: '' });
    setSelectedWidgets(new Set());
    setWidgetsToRemove(new Set());
    // Reset active tab to match the category
    if (selectedCategory && categoryToTab[selectedCategory]) {
      setActiveTab(categoryToTab[selectedCategory]);
    }
  };

  const handleWidgetToggle = (widgetName) => {
    const newSelected = new Set(selectedWidgets);
    if (newSelected.has(widgetName)) {
      newSelected.delete(widgetName);
    } else {
      newSelected.add(widgetName);
    }
    setSelectedWidgets(newSelected);
  };

  const handleExistingWidgetToggle = (widgetId) => {
    const newToRemove = new Set(widgetsToRemove);
    if (newToRemove.has(widgetId)) {
      newToRemove.delete(widgetId);
    } else {
      newToRemove.add(widgetId);
    }
    setWidgetsToRemove(newToRemove);
  };

  const handleConfirm = () => {
    console.log('handleConfirm called with:', {
      selectedCategory,
      activeTab,
      selectedWidgets: Array.from(selectedWidgets),
      widgetsToRemove: Array.from(widgetsToRemove),
      customWidget
    });

    // Remove selected existing widgets first
    widgetsToRemove.forEach(widgetId => {
      console.log('Removing widget:', widgetId);
      dispatch(removeWidget({ categoryId: selectedCategory, widgetId }));
    });

    // Add selected template widgets
    const categoryTemplates = widgetTemplates.find(template => template.category === activeTab);
    if (categoryTemplates) {
      categoryTemplates.widgets.forEach(widget => {
        if (selectedWidgets.has(widget.name)) {
          dispatch(addWidget({ 
            categoryId: selectedCategory, 
            widget: { name: widget.name, text: widget.text } 
          }));
        }
      });
    }

    // Add custom widget if provided
    if (customWidget.name && customWidget.text) {
      dispatch(addWidget({ 
        categoryId: selectedCategory, 
        widget: customWidget 
      }));
    }

    handleClose();
  };

  const handleCustomWidgetSubmit = () => {
    if (customWidget.name && customWidget.text) {
      dispatch(addWidget({ 
        categoryId: selectedCategory, 
        widget: customWidget 
      }));
      setCustomWidget({ name: '', text: '' });
    }
  };

  if (!isAddWidgetModalOpen) return null;

  // Get current category's widgets
  const currentCategory = categories.find(cat => cat.id === selectedCategory);
  const existingWidgets = currentCategory?.widgets || [];

  // Get available templates for current tab
  const availableTemplates = widgetTemplates.find(template => template.category === activeTab)?.widgets || [];

  return (
    <div className="side-panel-overlay">
      <div className={`side-panel ${isAddWidgetModalOpen ? 'open' : ''}`}>
        <div className="side-panel-header">
          <h2>Add Widget</h2>
          <button className="side-panel-close" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>
        
        <p className="side-panel-description">
          Personalise your dashboard by adding the following widget
        </p>

        <div className="side-panel-tabs">
          {widgetTemplates.map(template => (
            <button
              key={template.category}
              className={`side-panel-tab ${activeTab === template.category ? 'active' : ''}`}
              onClick={() => setActiveTab(template.category)}
            >
              {template.category}
            </button>
          ))}
        </div>

        <div className="side-panel-content">
          {/* Existing Widgets Section */}
          {existingWidgets.length > 0 && (
            <div className="existing-widgets-section">
              <h3>Current Widgets (uncheck to remove)</h3>
              <div className="widget-list">
                {existingWidgets.map(widget => (
                  <label key={widget.id} className="widget-checkbox existing-widget">
                    <input
                      type="checkbox"
                      checked={!widgetsToRemove.has(widget.id)}
                      onChange={() => handleExistingWidgetToggle(widget.id)}
                    />
                    <span className="checkmark"></span>
                    <div className="widget-info">
                      <span className="widget-name">{widget.name}</span>
                      <span className="widget-description">{widget.text || 'Existing widget'}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Available Templates Section */}
          <div className="available-widgets-section">
            <h3>Available Widgets (check to add)</h3>
            <div className="widget-list">
              {availableTemplates.map(widget => (
                <label key={widget.name} className="widget-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedWidgets.has(widget.name)}
                    onChange={() => handleWidgetToggle(widget.name)}
                  />
                  <span className="checkmark"></span>
                  <div className="widget-info">
                    <span className="widget-name">{widget.name}</span>
                    <span className="widget-description">{widget.text}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="custom-widget-section">
            <h3>Add Custom Widget</h3>
            <div className="custom-widget-form">
              <input
                type="text"
                placeholder="Widget Name"
                value={customWidget.name}
                onChange={(e) => setCustomWidget(prev => ({ ...prev, name: e.target.value }))}
                className="custom-input"
              />
              <textarea
                placeholder="Widget Text"
                value={customWidget.text}
                onChange={(e) => setCustomWidget(prev => ({ ...prev, text: e.target.value }))}
                className="custom-textarea"
                rows="3"
              />
              <button 
                className="add-custom-btn"
                onClick={handleCustomWidgetSubmit}
                disabled={!customWidget.name || !customWidget.text}
              >
                Add Custom Widget
              </button>
            </div>
          </div>
        </div>

        <div className="side-panel-actions">
          <button className="cancel-btn" onClick={handleClose}>
            Cancel
          </button>
          <button 
            className="confirm-btn" 
            onClick={handleConfirm}
            disabled={
              selectedWidgets.size === 0 && 
              widgetsToRemove.size === 0 && 
              (!customWidget.name || !customWidget.text)
            }
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetModal;