import { useDispatch } from 'react-redux';
import { Plus } from 'lucide-react';
import { toggleAddWidgetModal } from '../store/dashboardSlice.js';
import Widget from './Widget.jsx';

const Category = ({ category }) => {
  const dispatch = useDispatch();

  const handleAddWidget = () => {
    dispatch(toggleAddWidgetModal(category.id));
  };

  return (
    <div className="category">
      <div className="category-header">
        <h2 className="category-title">{category.name}</h2>
        <button className="category-add-widget-btn" onClick={handleAddWidget}>
          <Plus size={16} />
          Add Widget
        </button>
      </div>
      <div className="widgets-grid">
        {category.widgets.map(widget => (
          <Widget 
            key={widget.id} 
            widget={widget} 
            categoryId={category.id} 
          />
        ))}
        <Widget 
          isAddWidget={true} 
          onAddWidget={handleAddWidget}
        />
      </div>
    </div>
  );
};

export default Category;