import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Plus, Settings, Clock, ChevronDown, RefreshCw } from 'lucide-react';
import { setSearchTerm, toggleAddWidgetModal } from '../store/dashboardSlice.js';
import Category from './Category.jsx';
import AddWidgetModal from './AddWidgetModal.jsx';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { categories, searchTerm } = useSelector(state => state.dashboard);
  const [timeFilter, setTimeFilter] = useState('Last 2 days');
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false);
  const timeDropdownRef = useRef(null);
  const menuDropdownRef = useRef(null);

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleGlobalAddWidget = () => {
    // Default to first category when adding widget globally
    if (categories.length > 0) {
      dispatch(toggleAddWidgetModal(categories[0].id));
    }
  };

  const handleTimeFilterChange = (filter) => {
    setTimeFilter(filter);
    setIsTimeDropdownOpen(false);
  };

  const handleRefresh = () => {
    // Add refresh functionality here
    console.log('Refreshing dashboard...');
    // You can dispatch an action to refresh data
  };

  const handleMenuAction = (action) => {
    setIsMenuDropdownOpen(false);
    console.log(`Menu action: ${action}`);
    // Add menu action functionality here
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (timeDropdownRef.current && !timeDropdownRef.current.contains(event.target)) {
        setIsTimeDropdownOpen(false);
      }
      if (menuDropdownRef.current && !menuDropdownRef.current.contains(event.target)) {
        setIsMenuDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter categories and widgets based on search term
  const filteredCategories = categories.map(category => ({
    ...category,
    widgets: category.widgets.filter(widget =>
      widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      widget.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => 
    category.widgets.length > 0 || 
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    searchTerm === ''
  );

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <nav className="breadcrumb">
            <span>Home</span>
            <span className="separator">›</span>
            <span className="current">Dashboard V2</span>
          </nav>
        </div>
        
        <div className="header-center">
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search anything..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
        </div>

        <div className="header-right">
          <button className="icon-btn">
            <Settings size={20} />
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-title-section">
          <h1 className="dashboard-title">CNAPP Dashboard</h1>
          <div className="dashboard-actions">
            <button className="add-widget-btn" onClick={handleGlobalAddWidget}>
              <Plus size={16} />
              Add Widget
            </button>
            <button className="refresh-btn" onClick={handleRefresh}>
              <RefreshCw size={16} />
              Refresh
            </button>
            <div className="menu-dropdown-container" ref={menuDropdownRef}>
              <button 
                className="menu-btn"
                onClick={() => setIsMenuDropdownOpen(!isMenuDropdownOpen)}
              >
                <span className="three-dots">⋮</span>
              </button>
              {isMenuDropdownOpen && (
                <div className="menu-dropdown">
                  <button onClick={() => handleMenuAction('Edit Dashboard')}>Edit Dashboard</button>
                  <button onClick={() => handleMenuAction('Rearrange Widgets')}>Rearrange Widgets</button>
                </div>
              )}
            </div>
            <div className="time-filter-container" ref={timeDropdownRef}>
              <button 
                className="time-filter-btn"
                onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
              >
                <Clock size={16} />
                <span>{timeFilter}</span>
                <ChevronDown size={14} className={`dropdown-icon ${isTimeDropdownOpen ? 'open' : ''}`} />
              </button>
              {isTimeDropdownOpen && (
                <div className="time-filter-dropdown">
                  <button onClick={() => handleTimeFilterChange('Last 24 hours')}>Last 24 hours</button>
                  <button onClick={() => handleTimeFilterChange('Last 2 days')}>Last 2 days</button>
                  <button onClick={() => handleTimeFilterChange('Last 7 days')}>Last 7 days</button>
                  <button onClick={() => handleTimeFilterChange('Last 30 days')}>Last 30 days</button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="categories-container">
          {filteredCategories.length > 0 ? (
            filteredCategories.map(category => (
              <Category key={category.id} category={category} />
            ))
          ) : (
            <div className="no-results">
              <p>No widgets found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>

      <AddWidgetModal />
    </div>
  );
};

export default Dashboard;