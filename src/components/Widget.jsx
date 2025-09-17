import { X, Plus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { removeWidget } from '../store/dashboardSlice.js';

const Widget = ({ widget, categoryId, isAddWidget = false, onAddWidget }) => {
  const dispatch = useDispatch();

  const handleRemoveWidget = () => {
    dispatch(removeWidget({ categoryId, widgetId: widget.id }));
  };

  if (isAddWidget) {
    return (
      <div className="widget add-widget" onClick={onAddWidget}>
        <div className="add-widget-content">
          <Plus size={24} />
          <span>Add Widget</span>
        </div>
      </div>
    );
  }

  const renderWidgetContent = () => {
    switch (widget.type) {
      case 'donut':
        return (
          <div className="widget-chart-container">
            <div className="donut-chart">
              <div className="chart-center">
                <span className="chart-number">{widget.data?.total || '2'}</span>
                <span className="chart-label">Total</span>
              </div>
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-dot connected"></span>
                <span>Connected ({widget.data?.connected || '2'})</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot not-connected"></span>
                <span>Not Connected ({widget.data?.notConnected || '2'})</span>
              </div>
            </div>
          </div>
        );

      case 'donut-large':
        return (
          <div className="widget-chart-container">
            <div className="donut-chart large">
              <div className="chart-center">
                <span className="chart-number">{widget.data?.total || '9659'}</span>
                <span className="chart-label">Total</span>
              </div>
            </div>
            <div className="chart-legend vertical">
              <div className="legend-item">
                <span className="legend-dot failed"></span>
                <span>Failed ({widget.data?.failed || '1689'})</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot warning"></span>
                <span>Warning ({widget.data?.warning || '681'})</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot not-available"></span>
                <span>Not available ({widget.data?.notAvailable || '36'})</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot passed"></span>
                <span>Passed ({widget.data?.passed || '7253'})</span>
              </div>
            </div>
          </div>
        );

      case 'graph':
        return (
          <div className="graph-placeholder">
            <div className="graph-icon">📊</div>
            <p>{widget.text}</p>
          </div>
        );

      case 'progress':
        return (
          <div className="progress-container">
            <div className="progress-header">
              <span className="progress-total">{widget.data?.total || '1470'}</span>
              <span className="progress-label">{widget.data?.label || 'Total Vulnerabilities'}</span>
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar">
                <div className="progress-segment critical"></div>
                <div className="progress-segment high"></div>
                <div className="progress-segment medium"></div>
                <div className="progress-segment low"></div>
                <div className="progress-segment unassigned"></div>
              </div>
            </div>
            <div className="progress-legend">
              <div className="legend-item">
                <span className="legend-dot critical"></span>
                <span>Critical ({widget.data?.critical || '2'})</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot high"></span>
                <span>High ({widget.data?.high || '2'})</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot medium"></span>
                <span>Medium ({widget.data?.medium || '1'})</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot low"></span>
                <span>Low ({widget.data?.low || '701'})</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot unassigned"></span>
                <span>Unassigned ({widget.data?.unassigned || '1'})</span>
              </div>
            </div>
          </div>
        );

      default:
        return <p>{widget.text}</p>;
    }
  };

  return (
    <div className="widget">
      <div className="widget-header">
        <h3 className="widget-title">{widget.name}</h3>
        <button 
          className="remove-widget-btn"
          onClick={handleRemoveWidget}
          aria-label="Remove widget"
        >
          <X size={16} />
        </button>
      </div>
      <div className="widget-content">
        {renderWidgetContent()}
      </div>
    </div>
  );
};

export default Widget;