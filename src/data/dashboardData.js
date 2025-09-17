// Dashboard data structure with categories and widgets
export const initialDashboardData = {
  categories: [
    {
      id: 'cspm',
      name: 'CSPM Executive Dashboard',
      widgets: [
        {
          id: 'cloud-accounts',
          name: 'Cloud Accounts',
          text: '',
          type: 'donut',
          data: {
            total: 2,
            connected: 2,
            notConnected: 2
          }
        },
        {
          id: 'cloud-risk-assessment',
          name: 'Cloud Account Risk Assessment',
          text: '',
          type: 'donut-large',
          data: {
            total: 9659,
            failed: 1689,
            warning: 681,
            notAvailable: 36,
            passed: 7253
          }
        }
      ]
    },
    {
      id: 'cwpp',
      name: 'CWPP Dashboard:',
      widgets: [
        {
          id: 'namespace-alerts',
          name: 'Top 5 Namespace Specific Alerts',
          text: 'No Graph data available!',
          type: 'graph'
        },
        {
          id: 'workload-alerts',
          name: 'Workload Alerts',
          text: 'No Graph data available!',
          type: 'graph'
        }
      ]
    },
    {
      id: 'registry',
      name: 'Registry Scan',
      widgets: [
        {
          id: 'image-risk-assessment',
          name: 'Image Risk Assessment',
          text: '',
          type: 'progress',
          data: {
            total: 1470,
            critical: 2,
            high: 2,
            medium: 1,
            low: 701,
            unassigned: 1,
            label: 'Total Vulnerabilities'
          }
        },
        {
          id: 'image-security-issues',
          name: 'Image Security Issues',
          text: '',
          type: 'progress',
          data: {
            total: 2,
            critical: 2,
            high: 2,
            medium: 1,
            low: 0,
            unassigned: 1,
            label: 'Total Images'
          }
        }
      ]
    },
    {
      id: 'ticket',
      name: 'Ticket Dashboard',
      widgets: []
    }
  ]
};

// Available widget templates for adding new widgets
export const widgetTemplates = [
  {
    category: 'CSPM',
    widgets: [
      { name: 'Security Compliance', text: 'Track security compliance metrics and standards' },
      { name: 'Access Management', text: 'Monitor user access and permissions' },
      { name: 'Resource Inventory', text: 'View cloud resource inventory and usage' }
    ]
  },
  {
    category: 'CWPP',
    widgets: [
      { name: 'Runtime Protection', text: 'Real-time workload protection status' },
      { name: 'Vulnerability Assessment', text: 'Workload vulnerability analysis' },
      { name: 'Behavioral Analytics', text: 'Monitor workload behavior patterns' }
    ]
  },
  {
    category: 'Image',
    widgets: [
      { name: 'Container Security', text: 'Container image security analysis' },
      { name: 'Malware Detection', text: 'Detect malware in container images' },
      { name: 'License Compliance', text: 'Track software license compliance' }
    ]
  },
  {
    category: 'Ticket',
    widgets: [
      { name: 'Open Tickets', text: 'View and manage open support tickets' },
      { name: 'SLA Tracking', text: 'Monitor service level agreement compliance' },
      { name: 'Resolution Time', text: 'Track average ticket resolution times' }
    ]
  }
];