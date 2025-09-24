/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// --- Data ---
const interactionTypes = ['Email', 'Phone Call', 'Meeting', 'Letter', 'Mail Packet', 'Community Meeting', 'Virtual Online Call', 'Note'] as const;
const outreachTopics = ['Alternatives to Natural Gas', 'Available Incentives', 'Benefits of Electric Heat Pumps', 'Heat Pump Backup Systems', 'Weatherization', 'Heat Pump Sizing', 'Cost Transparency', 'NPA Project Details', 'RNG Cost & Bill Impacts', 'RNG GHG Emissions'] as const;
const rateClassCodes = ['R-1', 'R-2', 'R-3', 'R-4', 'G-41', 'G-42', 'G-43', 'G-51', 'G-52', 'G-53'] as const;

interface Interaction {
  id: number;
  type: typeof interactionTypes[number];
  notes: string;
  date: string;
  topics?: (typeof outreachTopics[number])[];
}

interface Appliance {
  id: number;
  name: string;
  btuPerHour: number;
}

type CustomerType = 'Residential' | 'Multifamily' | 'Small Business' | 'Commercial' | 'Industrial / Manufacturing' | 'Municipal / Government' | 'Institutional' | 'Agricultural' | 'Non-Profit';
type Language = 'English' | 'Spanish' | 'Portuguese' | 'Hmong' | 'Other';
const customerTypes: CustomerType[] = ['Residential', 'Multifamily', 'Small Business', 'Commercial', 'Industrial / Manufacturing', 'Municipal / Government', 'Institutional', 'Agricultural', 'Non-Profit'];
const contactRoles: Customer['contactRole'][] = ['Owner', 'Decision Maker', 'Tenant', 'Unknown'];
const acknowledgmentStatuses: Customer['acknowledgmentStatus'][] = ['Not Sent', 'Sent', 'Signed'];
const languages: Language[] = ['English', 'Spanish', 'Portuguese', 'Hmong', 'Other'];
const statuses: Customer['status'][] = ['New', 'Contacted', 'Responded'];

interface Customer {
  id: number;
  name: string;
  email: string;
  phoneHome: string;
  phoneCell: string;
  phoneWork: string;
  mainId: string;
  serviceId: string;
  meterNumber: string;
  address: string;
  mailingAddress: string;
  town: 'Fitchburg' | 'Gardner';
  contactRole: 'Owner' | 'Decision Maker' | 'Tenant' | 'Unknown';
  customerType: CustomerType;
  lastContacted: string;
  status: 'Contacted' | 'New' | 'Responded';
  interactions: Interaction[];
  acknowledgmentStatus: 'Not Sent' | 'Sent' | 'Signed';
  isLMI: boolean;
  hasParticipatedInEfficiencyProgram: boolean;
  isInEJCommunity: boolean;
  estimatedUpfrontCost: number;
  appliedIncentives: number;
  annualHeatLoadTherms: number;
  annualBaseLoadTherms: number;
  annualElectricalUsageKWH: number;
  electricProvider: 'Unitil' | 'National Grid';
  language: Language;
  rateClassCode: typeof rateClassCodes[number];
  letterStatus: { [key: number]: string; };
  appliances: Appliance[];
  comments: string;
}

interface GsepProject {
  projectNumber: string;
  year: number;
}

let customers: Customer[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice.j@example.com', phoneHome: '978-555-0101', phoneCell: '978-555-0102', phoneWork: '978-555-0103', mainId: 'MAIN-A1', serviceId: 'SVC-001', meterNumber: 'MTR-A1B2', address: '123 Main St, Apt 4B', mailingAddress: '123 Main St, Apt 4B', town: 'Fitchburg', contactRole: 'Owner', customerType: 'Multifamily', lastContacted: '2024-05-10', status: 'Responded', interactions: [ {id: 1, type: 'Email', notes: 'Responded positively to outreach.', date: '2024-05-10', topics: ['Alternatives to Natural Gas', 'Available Incentives']} ], acknowledgmentStatus: 'Signed', isLMI: true, hasParticipatedInEfficiencyProgram: true, isInEJCommunity: false, estimatedUpfrontCost: 15000, appliedIncentives: 5000, annualHeatLoadTherms: 750, annualBaseLoadTherms: 150, annualElectricalUsageKWH: 6000, electricProvider: 'Unitil', language: 'English', rateClassCode: 'R-2', letterStatus: { 1: '2024-05-01' }, appliances: [{id: 1, name: 'Forced Hot Water System', btuPerHour: 80000}, {id: 2, name: 'Hot Water Heater', btuPerHour: 40000}], comments: 'Eager to get started. Has already contacted an installer.' },
  { id: 2, name: 'Bob Williams', email: 'bob.w@example.com', phoneHome: '978-555-0104', phoneCell: '978-555-0105', phoneWork: '', mainId: 'MAIN-B2', serviceId: 'SVC-002', meterNumber: 'MTR-C3D4', address: '45 Parker St', mailingAddress: 'PO Box 123, Gardner MA', town: 'Gardner', contactRole: 'Decision Maker', customerType: 'Commercial', lastContacted: '2024-05-12', status: 'Contacted', interactions: [ {id: 1, type: 'Phone Call', notes: 'Left a voicemail.', date: '2024-05-12'} ], acknowledgmentStatus: 'Sent', isLMI: false, hasParticipatedInEfficiencyProgram: false, isInEJCommunity: true, estimatedUpfrontCost: 50000, appliedIncentives: 10000, annualHeatLoadTherms: 2500, annualBaseLoadTherms: 800, annualElectricalUsageKWH: 55000, electricProvider: 'National Grid', language: 'English', rateClassCode: 'G-42', letterStatus: { 1: '2024-05-02', 2: '2024-05-09' }, appliances: [], comments: '' },
  { id: 3, name: 'Charlie Brown', email: 'charlie.b@example.com', phoneHome: '', phoneCell: '978-555-0106', phoneWork: '', mainId: 'MAIN-C3', serviceId: 'SVC-003', meterNumber: 'MTR-E5F6', address: '456 Main St', mailingAddress: '456 Main St', town: 'Fitchburg', contactRole: 'Tenant', customerType: 'Residential', lastContacted: 'N/A', status: 'New', interactions: [], acknowledgmentStatus: 'Not Sent', isLMI: false, hasParticipatedInEfficiencyProgram: false, isInEJCommunity: false, estimatedUpfrontCost: 0, appliedIncentives: 0, annualHeatLoadTherms: 800, annualBaseLoadTherms: 120, annualElectricalUsageKWH: 7500, electricProvider: 'Unitil', language: 'Spanish', rateClassCode: 'R-2', letterStatus: {}, appliances: [], comments: 'Is a tenant, will need to coordinate with landlord. Landlord contact info: Jane Smith (978-555-1122).' },
  { id: 4, name: 'Diana Miller', email: 'diana.m@example.com', phoneHome: '978-555-0107', phoneCell: '', phoneWork: '', mainId: 'MAIN-D4', serviceId: 'SVC-004', meterNumber: 'MTR-G7H8', address: '78 Main St', mailingAddress: '78 Main St', town: 'Gardner', contactRole: 'Owner', customerType: 'Residential', lastContacted: '2024-04-28', status: 'Responded', interactions: [], acknowledgmentStatus: 'Signed', isLMI: false, hasParticipatedInEfficiencyProgram: true, isInEJCommunity: false, estimatedUpfrontCost: 12000, appliedIncentives: 4000, annualHeatLoadTherms: 950, annualBaseLoadTherms: 200, annualElectricalUsageKWH: 9000, electricProvider: 'National Grid', language: 'English', rateClassCode: 'R-2', letterStatus: {}, appliances: [], comments: '' },
  { id: 5, name: 'Ethan Davis', email: 'ethan.d@example.com', phoneHome: '', phoneCell: '978-555-0108', phoneWork: '', mainId: 'MAIN-E5', serviceId: 'SVC-005', meterNumber: 'MTR-I9J0', address: '789 Elm St, Unit 12', mailingAddress: '789 Elm St, Unit 12', town: 'Fitchburg', contactRole: 'Unknown', customerType: 'Multifamily', lastContacted: '2024-06-12', status: 'Contacted', interactions: [], acknowledgmentStatus: 'Sent', isLMI: true, hasParticipatedInEfficiencyProgram: false, isInEJCommunity: true, estimatedUpfrontCost: 0, appliedIncentives: 0, annualHeatLoadTherms: 600, annualBaseLoadTherms: 100, annualElectricalUsageKWH: 4500, electricProvider: 'Unitil', language: 'Hmong', rateClassCode: 'R-2', letterStatus: {1: '2024-05-15', 2: '2024-05-22', 3: '2024-05-29', 4: '2024-06-05', 5: '2024-06-12' }, appliances: [], comments: 'Final letter sent. No response yet.' },
  { id: 6, name: 'Fiona Garcia', email: 'fiona.g@example.com', phoneHome: '978-555-0109', phoneCell: '978-555-0110', phoneWork: '', mainId: 'MAIN-F6', serviceId: 'SVC-006', meterNumber: 'MTR-K1L2', address: '12 Parker St', mailingAddress: '12 Parker St', town: 'Gardner', contactRole: 'Tenant', customerType: 'Residential', lastContacted: 'N/A', status: 'New', interactions: [], acknowledgmentStatus: 'Not Sent', isLMI: false, hasParticipatedInEfficiencyProgram: false, isInEJCommunity: false, estimatedUpfrontCost: 0, appliedIncentives: 0, annualHeatLoadTherms: 700, annualBaseLoadTherms: 130, annualElectricalUsageKWH: 5200, electricProvider: 'National Grid', language: 'Portuguese', rateClassCode: 'R-1', letterStatus: {}, appliances: [], comments: '' },
  { id: 7, name: 'George Harris', email: 'george.h@example.com', phoneHome: '', phoneCell: '978-555-0111', phoneWork: '978-555-0112', mainId: 'MAIN-G7', serviceId: 'SVC-007', meterNumber: 'MTR-M3N4', address: '123 Main St, Apt 2A', mailingAddress: '123 Main St, Apt 2A', town: 'Fitchburg', contactRole: 'Owner', customerType: 'Multifamily', lastContacted: '2024-06-01', status: 'Contacted', interactions: [], acknowledgmentStatus: 'Not Sent', isLMI: true, hasParticipatedInEfficiencyProgram: false, isInEJCommunity: false, estimatedUpfrontCost: 0, appliedIncentives: 0, annualHeatLoadTherms: 650, annualBaseLoadTherms: 110, annualElectricalUsageKWH: 4800, electricProvider: 'Unitil', language: 'English', rateClassCode: 'R-2', letterStatus: { 1: '2024-06-01' }, appliances: [], comments: '' },
  { id: 8, name: 'Fitchburg Tire Center', email: 'service@fitchburgtire.com', phoneHome: '', phoneCell: '', phoneWork: '978-555-0201', mainId: 'MAIN-H8', serviceId: 'SVC-008', meterNumber: 'MTR-P5Q6', address: '25 Newton St', mailingAddress: '25 Newton St', town: 'Fitchburg', contactRole: 'Decision Maker', customerType: 'Small Business', lastContacted: '2024-05-20', status: 'Contacted', interactions: [], acknowledgmentStatus: 'Sent', isLMI: false, hasParticipatedInEfficiencyProgram: true, isInEJCommunity: false, estimatedUpfrontCost: 35000, appliedIncentives: 8000, annualHeatLoadTherms: 1800, annualBaseLoadTherms: 500, annualElectricalUsageKWH: 40000, electricProvider: 'Unitil', language: 'English', rateClassCode: 'G-41', letterStatus: { 1: '2024-05-20' }, appliances: [], comments: 'Owner seemed interested but wants to see a detailed cost-benefit analysis. Follow up in 2 weeks.' },
  { id: 9, name: 'Maria Rodriguez', email: 'maria.r@email.com', phoneHome: '978-555-0202', phoneCell: '', phoneWork: '', mainId: 'MAIN-I9', serviceId: 'SVC-009', meterNumber: 'MTR-R7S8', address: '88 Graham St', mailingAddress: '88 Graham St', town: 'Gardner', contactRole: 'Owner', customerType: 'Residential', lastContacted: '2024-06-01', status: 'Responded', interactions: [], acknowledgmentStatus: 'Not Sent', isLMI: true, hasParticipatedInEfficiencyProgram: false, isInEJCommunity: true, estimatedUpfrontCost: 14000, appliedIncentives: 6500, annualHeatLoadTherms: 850, annualBaseLoadTherms: 180, annualElectricalUsageKWH: 8200, electricProvider: 'National Grid', language: 'Spanish', rateClassCode: 'R-2', letterStatus: { 1: '2024-05-10', 2: '2024-05-17' }, appliances: [], comments: 'Responded to 2nd letter. Wants to schedule a home energy assessment.' },
  { id: 10, name: 'Fitchburg City Hall', email: 'clerk@fitchburgma.gov', phoneHome: '', phoneCell: '', phoneWork: '978-555-0203', mainId: 'MAIN-J10', serviceId: 'SVC-010', meterNumber: 'MTR-T9U0', address: '718 Main St', mailingAddress: '718 Main St', town: 'Fitchburg', contactRole: 'Decision Maker', customerType: 'Municipal / Government', lastContacted: 'N/A', status: 'New', interactions: [], acknowledgmentStatus: 'Not Sent', isLMI: false, hasParticipatedInEfficiencyProgram: false, isInEJCommunity: false, estimatedUpfrontCost: 250000, appliedIncentives: 0, annualHeatLoadTherms: 12000, annualBaseLoadTherms: 3000, annualElectricalUsageKWH: 200000, electricProvider: 'Unitil', language: 'English', rateClassCode: 'G-52', letterStatus: {}, appliances: [], comments: '' },
  { id: 11, name: 'Gardner Community Center', email: 'info@gardner-cc.org', phoneHome: '', phoneCell: '', phoneWork: '978-555-0204', mainId: 'MAIN-K11', serviceId: 'SVC-011', meterNumber: 'MTR-V1W2', address: '301 Central St', mailingAddress: 'PO Box 456, Gardner MA', town: 'Gardner', contactRole: 'Decision Maker', customerType: 'Non-Profit', lastContacted: '2024-06-05', status: 'Contacted', interactions: [], acknowledgmentStatus: 'Sent', isLMI: false, hasParticipatedInEfficiencyProgram: false, isInEJCommunity: true, estimatedUpfrontCost: 60000, appliedIncentives: 15000, annualHeatLoadTherms: 3500, annualBaseLoadTherms: 1000, annualElectricalUsageKWH: 70000, electricProvider: 'National Grid', language: 'English', rateClassCode: 'G-42', letterStatus: { 1: '2024-05-15', 2: '2024-05-22', 3: '2024-06-05' }, appliances: [], comments: 'Board needs to approve any capital projects. Sent them the informational packet.' },
  { id: 12, name: 'Precision Plastics Inc.', email: ' purchasing@precisionplastics.co', phoneHome: '', phoneCell: '', phoneWork: '978-555-0205', mainId: 'MAIN-L12', serviceId: 'SVC-012', meterNumber: 'MTR-X3Y4', address: '1 Industrial Dr', mailingAddress: '1 Industrial Dr', town: 'Fitchburg', contactRole: 'Decision Maker', customerType: 'Industrial / Manufacturing', lastContacted: 'N/A', status: 'New', interactions: [], acknowledgmentStatus: 'Not Sent', isLMI: false, hasParticipatedInEfficiencyProgram: false, isInEJCommunity: false, estimatedUpfrontCost: 400000, appliedIncentives: 0, annualHeatLoadTherms: 25000, annualBaseLoadTherms: 8000, annualElectricalUsageKWH: 500000, electricProvider: 'Unitil', language: 'English', rateClassCode: 'G-53', letterStatus: {}, appliances: [], comments: 'Large energy user. Potential for significant savings and GHG reduction.' },
  { id: 13, name: 'Luis Hernandez', email: 'l.hernandez@email.com', phoneHome: '', phoneCell: '978-555-0206', phoneWork: '', mainId: 'MAIN-M13', serviceId: 'SVC-013', meterNumber: 'MTR-Z5A6', address: '112 Pine St', mailingAddress: '112 Pine St', town: 'Gardner', contactRole: 'Tenant', customerType: 'Residential', lastContacted: '2024-05-21', status: 'Contacted', interactions: [], acknowledgmentStatus: 'Not Sent', isLMI: true, hasParticipatedInEfficiencyProgram: false, isInEJCommunity: true, estimatedUpfrontCost: 0, appliedIncentives: 0, annualHeatLoadTherms: 780, annualBaseLoadTherms: 160, annualElectricalUsageKWH: 7000, electricProvider: 'National Grid', language: 'Spanish', rateClassCode: 'R-2', letterStatus: { 1: '2024-05-21' }, appliances: [], comments: 'Tenant, needs landlord approval. Provided landlord contact information.' },
  { id: 14, name: 'Oak Hill Apartments', email: 'manager@oakhill.com', phoneHome: '', phoneCell: '', phoneWork: '978-555-0207', mainId: 'MAIN-N14', serviceId: 'SVC-014', meterNumber: 'MTR-B7C8', address: '500 Daniels St', mailingAddress: '500 Daniels St', town: 'Fitchburg', contactRole: 'Decision Maker', customerType: 'Multifamily', lastContacted: '2024-06-10', status: 'Responded', interactions: [{id: 1, type: 'Meeting', notes: 'Met with property manager, very interested in whole-building solution.', date: '2024-06-10', topics: ['Available Incentives', 'NPA Project Details']}], acknowledgmentStatus: 'Signed', isLMI: true, hasParticipatedInEfficiencyProgram: true, isInEJCommunity: true, estimatedUpfrontCost: 300000, appliedIncentives: 120000, annualHeatLoadTherms: 15000, annualBaseLoadTherms: 4000, annualElectricalUsageKWH: 250000, electricProvider: 'Unitil', language: 'English', rateClassCode: 'R-4', letterStatus: { 1: '2024-05-30' }, appliances: [], comments: 'Property management company is actively seeking quotes from installers.' },
  { id: 15, name: 'Green Meadow Farm', email: 'greenmeadow@farm.net', phoneHome: '978-555-0208', phoneCell: '', phoneWork: '', mainId: 'MAIN-O15', serviceId: 'SVC-015', meterNumber: 'MTR-D9E0', address: '451 Kelton Rd', mailingAddress: '451 Kelton Rd', town: 'Gardner', contactRole: 'Owner', customerType: 'Agricultural', lastContacted: 'N/A', status: 'New', interactions: [], acknowledgmentStatus: 'Not Sent', isLMI: false, hasParticipatedInEfficiencyProgram: false, isInEJCommunity: false, estimatedUpfrontCost: 45000, appliedIncentives: 0, annualHeatLoadTherms: 2200, annualBaseLoadTherms: 600, annualElectricalUsageKWH: 35000, electricProvider: 'National Grid', language: 'English', rateClassCode: 'G-41', letterStatus: {}, appliances: [], comments: '' },
  { id: 16, name: 'Fitchburg State University', email: 'facilities@fitchburgstate.edu', phoneHome: '', phoneCell: '', phoneWork: '978-555-0209', mainId: 'MAIN-P16', serviceId: 'SVC-016', meterNumber: 'MTR-F1G2', address: '160 Pearl St', mailingAddress: '160 Pearl St', town: 'Fitchburg', contactRole: 'Decision Maker', customerType: 'Institutional', lastContacted: '2024-06-11', status: 'Contacted', interactions: [], acknowledgmentStatus: 'Sent', isLMI: false, hasParticipatedInEfficiencyProgram: true, isInEJCommunity: false, estimatedUpfrontCost: 1200000, appliedIncentives: 0, annualHeatLoadTherms: 80000, annualBaseLoadTherms: 20000, annualElectricalUsageKWH: 2000000, electricProvider: 'Unitil', language: 'English', rateClassCode: 'G-53', letterStatus: { 1: '2024-05-14', 2: '2024-05-21', 3: '2024-05-28', 4: '2024-06-11' }, appliances: [], comments: 'Multiple buildings involved. Engaging with their sustainability coordinator.' },
  { id: 17, name: 'Gardner Public Library', email: 'director@gardnerlibrary.org', phoneHome: '', phoneCell: '', phoneWork: '978-555-0210', mainId: 'MAIN-Q17', serviceId: 'SVC-017', meterNumber: 'MTR-H3I4', address: '69 West Lynde St', mailingAddress: '69 West Lynde St', town: 'Gardner', contactRole: 'Decision Maker', customerType: 'Municipal / Government', lastContacted: '2024-05-25', status: 'Responded', interactions: [{id: 1, type: 'Email', notes: 'Expressed interest in geothermal options.', date: '2024-05-25', topics: ['Alternatives to Natural Gas']}], acknowledgmentStatus: 'Not Sent', isLMI: false, hasParticipatedInEfficiencyProgram: false, isInEJCommunity: true, estimatedUpfrontCost: 85000, appliedIncentives: 20000, annualHeatLoadTherms: 4500, annualBaseLoadTherms: 1200, annualElectricalUsageKWH: 90000, electricProvider: 'National Grid', language: 'English', rateClassCode: 'G-43', letterStatus: { 1: '2024-05-18' }, appliances: [], comments: 'Waiting for state grant funding cycle to open before proceeding.' },
];

let gsepProjects: { [mainId: string]: GsepProject } = {
  'MAIN-A1': { projectNumber: 'GSEP-PN-101', year: 2025 },
  'MAIN-B2': { projectNumber: 'GSEP-PN-102', year: 2026 },
  'MAIN-C3': { projectNumber: 'GSEP-PN-103', year: 2025 },
  'MAIN-D4': { projectNumber: 'GSEP-PN-104', year: 2024 },
  'MAIN-E5': { projectNumber: 'GSEP-PN-101', year: 2025 },
  'MAIN-F6': { projectNumber: 'GSEP-PN-103', year: 2025 },
  'MAIN-G7': { projectNumber: 'GSEP-PN-101', year: 2025 },
  'MAIN-H8': { projectNumber: 'GSEP-PN-102', year: 2026 },
  'MAIN-I9': { projectNumber: 'GSEP-PN-104', year: 2024 },
  'MAIN-J10': { projectNumber: 'GSEP-PN-101', year: 2025 },
  'MAIN-K11': { projectNumber: 'GSEP-PN-103', year: 2025 },
  'MAIN-L12': { projectNumber: 'GSEP-PN-102', year: 2026 },
  'MAIN-M13': { projectNumber: 'GSEP-PN-104', year: 2024 },
  'MAIN-N14': { projectNumber: 'GSEP-PN-101', year: 2025 },
  'MAIN-O15': { projectNumber: 'GSEP-PN-103', year: 2025 },
  'MAIN-P16': { projectNumber: 'GSEP-PN-101', year: 2025 },
  'MAIN-Q17': { projectNumber: 'GSEP-PN-102', year: 2026 },
};

const towns: ('Fitchburg' | 'Gardner')[] = ['Fitchburg', 'Gardner'];

// --- App State ---
let activeView: 'dashboard' | 'customers' | 'gsep' | 'resources' | 'mailers' | 'generateLetters' | 'reportBuilder' = 'dashboard';
let activeModal: 'add' | 'log' | 'acknowledgment' | null = null;
let editingCustomer: Customer | null = null; // For log/acknowledgment modal
let newCustomerForModal: (Omit<Customer, 'id' | 'lastContacted' | 'interactions' | 'letterStatus'> & { appliances: Appliance[] }) | null = null;
let inlineEditingCustomerId: number | null = null;
let editingCommentsForCustomerId: number | null = null;
const expandedCustomers = new Set<number>();
const openActionMenus = new Set<number>();
const expandedGsepProjects = new Set<string>();

let activeTown: 'Fitchburg' | 'Gardner' = 'Fitchburg';
let selectedStreet: string | null = null;

// --- Helper ---
const getStreet = (address: string): string => address.split(',')[0].replace(/^\d+\s+/, '').trim();
const formatCurrency = (val: number) => `$${Number(val).toLocaleString()}`;
const formatPercent = (val: number) => `${val.toFixed(1)}%`;
const calculateDaysToStart = (projectYear: number | undefined): { text: string; className: string } => {
    if (!projectYear) return { text: 'N/A', className: 'na' };
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight
    
    // The start date is always June 1st of the project year.
    const startDate = new Date(projectYear, 5, 1); // Month is 0-indexed, so 5 is June.
    startDate.setHours(0, 0, 0, 0);
    
    if (isNaN(startDate.getTime())) return { text: 'Invalid Year', className: 'error' };

    const diffTime = startDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0) return { text: `Starts in ${diffDays} days`, className: 'future' };
    if (diffDays < 0) return { text: `Started ${Math.abs(diffDays)} days ago`, className: 'past' };
    return { text: 'Starts today', className: 'today' };
}

function renderInfoIcon(tooltipText: string): string {
    return `
      <span class="info-icon" data-tooltip="${tooltipText}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
        </svg>
      </span>
    `;
}

function setupMailingAddressSync(form: HTMLElement) {
    const serviceAddressInput = form.querySelector('[name="address"]') as HTMLInputElement;
    const mailingAddressInput = form.querySelector('[name="mailingAddress"]') as HTMLInputElement;
    const sameAsAddressCheckbox = form.querySelector('[name="sameAsAddress"]') as HTMLInputElement;

    if (!serviceAddressInput || !mailingAddressInput || !sameAsAddressCheckbox) return;

    const syncState = () => {
        if (sameAsAddressCheckbox.checked) {
            mailingAddressInput.value = serviceAddressInput.value;
            mailingAddressInput.disabled = true;
        } else {
            mailingAddressInput.disabled = false;
        }
    };

    serviceAddressInput.addEventListener('input', () => {
        if (sameAsAddressCheckbox.checked) {
            mailingAddressInput.value = serviceAddressInput.value;
        }
    });

    sameAsAddressCheckbox.addEventListener('change', syncState);

    // Initial sync
    syncState();
}


// --- App Bootstrap & Rendering ---
function renderApp() {
  const appElement = document.getElementById('app');
  const modalContainer = document.getElementById('modal-container');
  if (!appElement || !modalContainer) return;

  const viewContent = () => {
    switch (activeView) {
        case 'dashboard': return renderDashboard();
        case 'gsep': return renderGsepView();
        case 'customers': return renderCustomersView();
        case 'resources': return renderResourcesView();
        case 'mailers': return renderMailersView();
        case 'generateLetters': return renderGenerateLettersView();
        case 'reportBuilder': return renderReportBuilderView();
        default: return '';
    }
  }

  appElement.innerHTML = `
    <header>
      <div class="top-header">
        <div class="app-title">
          <h1>NPA Customer Outreach Tool</h1>
          <p>GSEP Program - By Tim Bickford Rev-A Beta</p>
        </div>
        <div class="header-file-actions">
          <button class="header-action-btn secondary" data-action="import-data">Import .json</button>
          <button class="header-action-btn secondary" data-action="export-data">Export .json</button>
        </div>
      </div>
      <div class="main-header-controls">
        <nav class="main-nav">
          <button class="nav-btn ${activeView === 'dashboard' ? 'active' : ''}" data-view="dashboard">Dashboard</button>
          <button class="nav-btn ${activeView === 'gsep' ? 'active' : ''}" data-view="gsep">GSEP PRJ</button>
          <button class="nav-btn ${activeView === 'customers' ? 'active' : ''}" data-view="customers">Customers</button>
          <button class="nav-btn ${activeView === 'mailers' ? 'active' : ''}" data-view="mailers">Mailers</button>
          <button class="nav-btn ${activeView === 'generateLetters' ? 'active' : ''}" data-view="generateLetters">Generate Letters</button>
          <button class="nav-btn ${activeView === 'resources' ? 'active' : ''}" data-view="resources">Resources</button>
        </nav>
        <div class="header-actions">
          <button class="header-action-btn" data-action="show-report-builder">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            Generate PDF Report
          </button>
          <button class="header-action-btn" data-action="add">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add Customer
          </button>
        </div>
      </div>
    </header>
    <main>
      ${viewContent()}
    </main>
  `;
  renderModals(modalContainer);

  if (inlineEditingCustomerId) {
    const form = document.getElementById('inline-edit-form');
    if (form) {
        setupMailingAddressSync(form);
    }
  }
}

function renderDashboard(): string {
    const totalCustomers = customers.length;
    const lmiCustomers = customers.filter(c => c.isLMI).length;
    const ejCustomers = customers.filter(c => c.isInEJCommunity).length;
    const totalIncentives = customers.reduce((sum, c) => sum + c.appliedIncentives, 0);

    const statusCounts = customers.reduce((acc, c) => {
        acc[c.status] = (acc[c.status] || 0) + 1;
        return acc;
    }, {} as Record<Customer['status'], number>);
    const maxStatusCount = Math.max(...Object.values(statusCounts), 1);
    
    const fitchburgCustomers = customers.filter(c => c.town === 'Fitchburg');
    const gardnerCustomers = customers.filter(c => c.town === 'Gardner');
    
    const customerTypeCounts = customers.reduce((acc, c) => {
        acc[c.customerType] = (acc[c.customerType] || 0) + 1;
        return acc;
    }, {} as Record<CustomerType, number>);

    return `
        <div class="dashboard-grid">
            <div class="dashboard-card kpi-card">
                <div class="card-title">Total Customers</div>
                <div class="card-metric">${totalCustomers}</div>
            </div>
            <div class="dashboard-card kpi-card">
                <div class="card-title">LMI Customers</div>
                <div class="card-metric">${formatPercent(totalCustomers > 0 ? (lmiCustomers / totalCustomers) * 100 : 0)}</div>
                <div class="card-sub-metric">${lmiCustomers} of ${totalCustomers}</div>
            </div>
            <div class="dashboard-card kpi-card">
                <div class="card-title">EJ Community</div>
                <div class="card-metric">${formatPercent(totalCustomers > 0 ? (ejCustomers / totalCustomers) * 100 : 0)}</div>
                <div class="card-sub-metric">${ejCustomers} of ${totalCustomers}</div>
            </div>
            <div class="dashboard-card kpi-card">
                <div class="card-title">Total Incentives</div>
                <div class="card-metric">${formatCurrency(totalIncentives)}</div>
            </div>
            <div class="dashboard-card chart-card full-width">
                <div class="card-title">Outreach Funnel</div>
                <div class="bar-chart">
                    ${statuses.map(status => `
                        <div class="bar-item">
                            <div class="bar-label">${status} (${statusCounts[status] || 0})</div>
                            <div class="bar-container">
                                <div class="bar status-${status.toLowerCase()}" style="width: ${((statusCounts[status] || 0) / maxStatusCount) * 100}%"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
             <div class="dashboard-card half-width">
                <div class="card-title">Town Comparison</div>
                <div class="comparison-grid">
                    <div></div><div><strong>Fitchburg</strong></div><div><strong>Gardner</strong></div>
                    <div>Customers</div><div>${fitchburgCustomers.length}</div><div>${gardnerCustomers.length}</div>
                    <div>Responded</div>
                    <div>${fitchburgCustomers.filter(c => c.status === 'Responded').length}</div>
                    <div>${gardnerCustomers.filter(c => c.status === 'Responded').length}</div>
                    <div>LMI</div><div>${fitchburgCustomers.filter(c => c.isLMI).length}</div><div>${gardnerCustomers.filter(c => c.isLMI).length}</div>
                    <div>Incentives</div><div>${formatCurrency(fitchburgCustomers.reduce((s, c) => s + c.appliedIncentives, 0))}</div><div>${formatCurrency(gardnerCustomers.reduce((s, c) => s + c.appliedIncentives, 0))}</div>
                </div>
            </div>
            <div class="dashboard-card half-width">
                <div class="card-title">Customer Type Distribution</div>
                 <div class="bar-chart vertical">
                    ${Object.entries(customerTypeCounts).sort(([,a],[,b]) => b - a).map(([type, count]) => `
                        <div class="bar-item">
                            <div class="bar-label">${type} (${count})</div>
                            <div class="bar-container">
                                <div class="bar" style="width: ${(count / totalCustomers) * 100}%"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

const mailerTemplates = [
    {
        title: "Upcoming Gas Infrastructure Work and Your Clean Energy Options",
        content: `[Customer Name]
[Customer Mailing Address]

Dear [Customer Name],

We are writing to inform you that Unitil will soon be upgrading natural gas infrastructure in your area to continue providing safe, reliable service. This work comes at a critical time as Massachusetts transitions toward a cleaner energy future.

State law mandates significant greenhouse gas emission reductions by 2030 and achieving net-zero emissions by 2050. To meet these goals, the Commonwealth is moving away from fossil fuels like natural gas. This means homes will increasingly be powered by clean, renewable electricity.

Modern, high-efficiency electric technologies are available today to help you align with this transition:
- Air-Source Heat Pumps: Provide both heating and cooling in one ultra-efficient system, designed for New England winters.
- Geothermal Heat Pumps: Offer unparalleled efficiency by using the earth's stable temperature for heating and cooling.
- Heat Pump Water Heaters & Dryers: Use significantly less energy than their gas counterparts.
- Induction Cooktops: Deliver faster, safer, and more precise cooking without indoor combustion.

Making the switch offers immediate benefits, including lower long-term operating costs, improved indoor air quality, and stable energy bills. Generous financial incentives from Mass Save® and the federal government can cover thousands of dollars in upfront costs.

Our team is committed to keeping you informed and providing resources to help you explore these options.

Sincerely,
The Unitil Team

Contact us at:
Phone: [Electrification Program Phone Number]
Email: [Electrification Program Email]`
    },
    {
        title: "Prepare Your Home for Massachusetts' Clean Energy Future",
        content: `[Customer Name]
[Customer Mailing Address]

Dear [Customer Name],

Massachusetts is on a path to a clean energy future, with ambitious goals to achieve net-zero emissions by 2050. As we proceed with upgrading the natural gas infrastructure in your neighborhood, it presents a perfect opportunity to consider how you can "future-proof" your home.

Aligning your home with state energy requirements today protects you from rising fossil fuel costs and ensures your property is ready for the next generation of clean technology. The most effective way to do this is by transitioning from gas-burning appliances to modern, high-efficiency electric systems.

By embracing electrification, you gain:
- Long-Term Stability: Reduce your reliance on fluctuating fossil fuel prices.
- Enhanced Comfort: Enjoy consistent heating and cooling from a single, quiet system like an air-source heat pump.
- A Healthier Home: Eliminate the source of indoor combustion and improve your family's air quality.

You don't have to wait for your old equipment to fail. With thousands of dollars available through Mass Save® rebates, zero-interest loans, and federal tax credits, planning your transition now is both smart and affordable.

Let us help you take the first step toward a more resilient and sustainable home.

Sincerely,
The Unitil Team

Contact us at:
Phone: [Electrification Program Phone Number]
Email: [Electrification Program Email]`
    },
    {
        title: "Unlock Thousands in Savings with Clean Energy Upgrades",
        content: `[Customer Name]
[Customer Mailing Address]

Dear [Customer Name],

Did you know you could be eligible for thousands of dollars in rebates and tax credits to upgrade your home's heating and cooling systems? As Massachusetts moves toward its clean energy goals, unprecedented financial incentives are available to help you switch from natural gas to high-efficiency electric technology.

Modern electric appliances are up to three times more efficient than their gas-powered counterparts, leading to significant long-term savings on your energy bills. Available programs include:
- Mass Save® Rebates: Offering substantial upfront discounts on heat pumps, heat pump water heaters, and weatherization.
- Zero-Interest HEAT Loans: Providing accessible financing for your energy efficiency projects.
- Federal Tax Credits: Reducing your tax burden for installing qualifying equipment.

With Unitil scheduled to perform natural gas infrastructure upgrades in your area, now is the ideal time to leverage these programs. By electrifying, you not only reduce your bills but also improve your home's comfort and air quality.

Our team can help you navigate these incentives and calculate your potential savings.

Sincerely,
The Unitil Team

Contact us at:
Phone: [Electrification Program Phone Number]
Email: [Electrification Program Email]`
    },
    {
        title: "A Healthier, Safer Home with Modern Electric Appliances",
        content: `[Customer Name]
[Customer Mailing Address]

Dear [Customer Name],

Your family's health and safety are paramount. As Unitil prepares for upgrading natural gas infrastructure in your area, we want to share information on how you can significantly improve your home's indoor air quality by switching from natural gas appliances to modern electric alternatives.

Burning natural gas indoors for cooking or heating releases pollutants like nitrogen dioxide, which can worsen respiratory conditions. High-efficiency electric systems, such as heat pumps for heating and induction cooktops for cooking, eliminate this indoor combustion entirely, creating a healthier living space.

These technologies offer more than just clean air:
- Superior Performance: Induction stoves are faster and more responsive than gas.
- All-in-One Comfort: Heat pumps provide reliable, efficient heating and cooling in one unit.
- Peace of Mind: Remove the risks associated with gas lines and combustion inside your home.

Massachusetts' clean energy goals are supported by strong financial incentives, making this healthy upgrade more affordable than ever.

Let us help you explore the benefits of a cleaner, healthier, all-electric home.

Sincerely,
The Unitil Team

Contact us at:
Phone: [Electrification Program Phone Number]
Email: [Electrification Program Email]`
    },
    {
        title: "Your Energy Future: Questions & Answers",
        content: `[Customer Name]
[Customer Mailing Address]

Dear [Customer Name],

With upcoming work to upgrade the natural gas infrastructure in your area and evolving state energy policies, you may have questions. We're here to provide clear answers about the transition to clean energy.

Why is this change happening?
Massachusetts law requires a major shift away from fossil fuels to meet 2050 net-zero emissions goals. Electrification, by replacing gas appliances with clean electric ones, is key to this effort.

Do electric heat pumps really work in our cold winters?
Absolutely. Today's cold-climate air-source heat pumps are designed specifically for New England weather, providing reliable and efficient heat even on the coldest days.

Isn't it expensive to switch?
It's more affordable than ever. A combination of Mass Save® rebates, 0% HEAT loans, and federal tax credits can reduce the upfront cost by thousands of dollars, while the system's high efficiency lowers your long-term energy bills.

What are the main benefits?
Beyond environmental responsibility, you'll enjoy lower operating costs, improved indoor air quality (by eliminating gas combustion), and the convenience of all-in-one heating and cooling.

We encourage you to explore these options now to take full advantage of available incentives.

Sincerely,
The Unitil Team

Contact us at:
Phone: [Electrification Program Phone Number]
Email: [Electrification Program Email]`
    }
];

function renderMailersView(): string {
    return `
        <div class="resources-view">
            <h2>Customer Mailer Templates</h2>
            <p>Use these pre-written letters for initial customer contact. Each letter provides detailed information about electrification options and how customers can get in touch with Unitil. Click the button to copy the full text to your clipboard.</p>
        </div>
        <div class="mailers-grid">
            ${mailerTemplates.map(mailer => `
                <div class="mailer-card">
                    <h3>${mailer.title}</h3>
                    <div class="mailer-content">
                        <pre class="mailer-body">${mailer.content}</pre>
                    </div>
                    <button class="copy-mailer-btn" data-action="copy-mailer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                           <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                           <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zM-1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1z"/>
                        </svg>
                        Copy to Clipboard
                    </button>
                </div>
            `).join('')}
        </div>
    `;
}

function getCustomersForNextLetterBatch() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Set the threshold to 30 days ago
    const thirtyDaysAgo = new Date(today.getTime());
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const eligibleCustomers = [];

    for (const customer of customers) {
        const sentLetterNumbers = Object.keys(customer.letterStatus).map(Number);
        
        // Skip if responded, no letters sent yet, or all 5 have been sent
        if (customer.status === 'Responded' || sentLetterNumbers.length === 0 || sentLetterNumbers.length >= 5) {
            continue;
        }

        const lastLetterNumber = Math.max(...sentLetterNumbers);
        const lastLetterDateStr = customer.letterStatus[lastLetterNumber];
        const lastLetterDate = new Date(lastLetterDateStr);
        lastLetterDate.setHours(0, 0, 0, 0); // Normalize date

        // Check if the last letter was sent on or before 30 days ago
        if (lastLetterDate.getTime() <= thirtyDaysAgo.getTime()) {
            eligibleCustomers.push({
                customer,
                lastLetterNumber,
                lastLetterDate: lastLetterDateStr,
                nextLetterNumber: lastLetterNumber + 1
            });
        }
    }
    return eligibleCustomers;
}


function renderGenerateLettersView(): string {
    const customersForBatch = getCustomersForNextLetterBatch();

    return `
        <div class="generate-letters-view">
            <h2>Generate Next Outreach Letters</h2>
            <p>This tool generates the next letter in the sequence for customers who have not responded for 30 days or more since their last letter. The generated document can be used for a mass printing and mailing. After generating, the system will automatically log the letters as sent.</p>

            <div class="dashboard-card">
                <div class="card-title">Customers Due for Next Letter (${customersForBatch.length})</div>
                ${customersForBatch.length > 0 ? `
                    <div class="generate-actions">
                        <button class="header-action-btn" data-action="generate-pdf">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                            Generate Master PDF & Log as Sent
                        </button>
                    </div>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Mailing Address</th>
                                    <th>Last Letter Sent</th>
                                    <th>Next Letter Due</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${customersForBatch.map(item => `
                                    <tr>
                                        <td>${item.customer.name}</td>
                                        <td>${item.customer.mailingAddress}</td>
                                        <td>Letter ${item.lastLetterNumber} on ${item.lastLetterDate}</td>
                                        <td><span class="status-badge status-new">Letter ${item.nextLetterNumber}</span></td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                ` : `
                    <p class="empty-state">There are currently no customers due for their next letter.</p>
                `}
            </div>
        </div>
    `;
}


function renderResourcesView(): string {
    return `
        <div class="resources-view">
            <h2>Outreach Resources & Guidelines</h2>
            <p>This section provides mandatory disclosures and key talking points for customer engagement.</p>
            
            <div class="dashboard-card">
                <div class="card-title">I. Mandatory Disclosures for New Gas Service (Customer Acknowledgment)</div>
                <div class="card-content">
                    <p>For prospective individual residential and small commercial customers requesting a new gas connection, the utility must ensure they are engaged with alternative options to natural gas service and formally acknowledge this information:</p>
                    <ul>
                        <li><strong>Alternatives Disclosure:</strong> Customers must be engaged with alternative options to natural gas service.</li>
                        <li><strong>Required Acknowledgment Form:</strong> Customers must be provided with the “Customer Acknowledged” form and required to sign it.</li>
                        <li><strong>Content of the Form:</strong> This form confirms that the customer has been informed of electrification options and has chosen to proceed with obtaining natural gas service. Specifically, the document provides information on:
                            <ul>
                                <li>Alternatives to natural gas available to customers.</li>
                                <li>Available incentives for these alternatives.</li>
                                <li>The benefits of electric heat pumps.</li>
                            </ul>
                        </li>
                        <li><strong>Large Customer Engagement:</strong> The signed "Customer Acknowledged" form is required for residential subdivisions and large commercial and industrial customers, and project-specific alternatives may also be discussed with these customers.</li>
                    </ul>
                </div>
            </div>

            <div class="dashboard-card">
                <div class="card-title">II. Detailed Technical and Financial Education for Electrification</div>
                <div class="card-content">
                    <p>Customer education, particularly regarding electric heat pump adoption and efficiency, must be enhanced and precise:</p>
                    <ul>
                        <li><strong>Heat Pump Capabilities and Backup Systems:</strong> Provide sufficient information to customers about the capabilities of heat pumps so they may reach an informed conclusion about the true need for backup heating systems. Generally, cold-climate heat pumps should eliminate the need for backup heating systems.</li>
                        <li><strong>Weatherization and Sizing:</strong> Customers should be informed and encouraged to implement proper weatherization of homes in advance of heat pump installation. Ensure that contractors properly size heat pumps prior to installation to prevent increased energy costs.</li>
                        <li><strong>Cost Transparency:</strong> Education programs must prioritize cost transparency and clear communication.</li>
                    </ul>
                </div>
            </div>

            <div class="dashboard-card">
                <div class="card-title">III. Communication Requirements for Non-Pipeline Alternatives (NPAs)</div>
                <div class="card-content">
                    <p>For NPA projects, which involve evaluating electrification, thermal networks, or efficiency to avoid new gas investments, specific customer engagement requirements apply:</p>
                    <ul>
                        <li><strong>Project Information:</strong> Customers must be informed about the costs, benefits, and the importance of their participation in the NPA project.</li>
                        <li><strong>Available Funding and Incentives:</strong> Customers must receive information about additional funding opportunities for NPA technologies, complementing existing Mass Save programs. Enhanced incentives are available, particularly for LMI customers.</li>
                        <li><strong>Technology Scope:</strong> Limit information to technologies consistent with the NPA Framework. If a customer chooses an outside solution, the utility will accept but not provide incremental funding beyond available state/federal programs.</li>
                        <li><strong>Commitment to Service Obligation:</strong> Inform customers that the utility must provide safe and reliable service and generally may not terminate service without the customer’s permission. The utility cannot legally bind a customer to cease use of natural gas.</li>
                    </ul>
                </div>
            </div>
            
            <div class="dashboard-card">
                <div class="card-title">IV. Information Specific to Renewable Natural Gas (RNG)</div>
                <div class="card-content">
                    <p>If offering a voluntary opt-in sales tariff for Renewable Natural Gas (RNG), the following must be clearly communicated:</p>
                    <ul>
                        <li><strong>Cost and Financial Impacts:</strong> Inform potential customers of the cost of RNG and the likely bill impacts.</li>
                        <li><strong>Environmental Profile:</strong> Inform customers of the lifecycle GHG emissions of the RNG product.</li>
                        <li><strong>Voluntary Participation:</strong> Clarify that participation must be voluntary. All associated costs must be recovered solely from participants to avoid cross-subsidization.</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}

function renderGsepView(): string {
  const projects: { [projectKey: string]: Customer[] } = {};
  const noProjectCustomers: Customer[] = [];

  for (const customer of customers) {
    const project = gsepProjects[customer.mainId];
    if (project) {
      const key = `${project.projectNumber} (${project.year})`;
      if (!projects[key]) {
        projects[key] = [];
      }
      projects[key].push(customer);
    } else {
      noProjectCustomers.push(customer);
    }
  }

  const sortedProjects = Object.keys(projects).sort();

  const renderProjectGroup = (title: string, projectKey: string, projectCustomers: Customer[]) => {
    const isExpanded = expandedGsepProjects.has(projectKey);
    return `
      <div class="gsep-project-group">
        <div class="gsep-project-header" data-action="expand-gsep" data-project-key="${projectKey}">
          <h3>${title}</h3>
          <div class="gsep-project-meta">
            <span>${projectCustomers.length} Customers</span>
            <svg class="chevron ${isExpanded ? 'expanded' : ''}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </div>
        </div>
        <div class="gsep-project-content ${isExpanded ? '' : 'hidden'}">
          ${projectCustomers.length > 0 ? `
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Town</th>
                    <th>Status</th>
                    <th>Main ID</th>
                    <th>Service ID</th>
                    <th>Meter Number</th>
                    <th class="th-numeric">Total BTU/HR</th>
                    <th>Days to Start</th>
                    <th>Last Contacted</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${projectCustomers.map(c => renderCustomerRow(c, true)).join('')}
                </tbody>
              </table>
            </div>
          ` : '<p class="empty-state">No customers in this project.</p>'}
        </div>
      </div>
    `;
  };

  let html = '<div class="gsep-view">';
  sortedProjects.forEach(key => {
    html += renderProjectGroup(key, key, projects[key]);
  });

  if (noProjectCustomers.length > 0) {
    html += renderProjectGroup('Customers without a GSEP Project', 'no-project', noProjectCustomers);
  }

  if (sortedProjects.length === 0 && noProjectCustomers.length === 0) {
      html += '<div class="dashboard-card"><p>No customers or projects to display. Add a customer to get started.</p></div>'
  }

  html += '</div>';
  return html;
}

function renderCustomersView(): string {
  const currentTownCustomers = customers.filter(c => c.town === activeTown);
  const streets = ['All Streets', ...Array.from(new Set(currentTownCustomers.map(c => getStreet(c.address)))).sort()];
  if (selectedStreet && !streets.includes(selectedStreet)) {
    selectedStreet = null; // Reset if street doesn't exist in new town
  }

  const filteredCustomers = selectedStreet && selectedStreet !== 'All Streets'
    ? currentTownCustomers.filter(c => getStreet(c.address) === selectedStreet)
    : currentTownCustomers;

  return `
      <div class="tabs">
        ${towns.map(town => `<div class="tab ${activeTown === town ? 'active' : ''}" data-town="${town}">${town}</div>`).join('')}
      </div>
      <div class="main-layout">
        <aside class="sidebar">
          <h3>Streets</h3>
          <ul>
            ${streets.map(street => `<li class="${(selectedStreet === street || (!selectedStreet && street === 'All Streets')) ? 'active' : ''}" data-street="${street}">${street}</li>`).join('')}
          </ul>
        </aside>
        <div class="content-area">
          <div class="content-header">
             <h2>${selectedStreet || 'All Customers'} <span class="customer-count">(${filteredCustomers.length})</span></h2>
             <button class="action-btn download-btn" data-action="download-report">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Download Report (CSV)
             </button>
          </div>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th class="th-numeric">Total BTU/HR</th>
                  <th>Main ID</th>
                  <th>Service ID</th>
                  <th>Meter Number</th>
                  <th>GSEP Project</th>
                  <th>Days to Start</th>
                  <th>Last Contacted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${filteredCustomers.length > 0 ? filteredCustomers.map(c => renderCustomerRow(c, false)).join('') : '<tr><td colspan="11" style="text-align:center;padding:2rem;">No customers found.</td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
}

function renderCustomerRow(customer: Customer, isGsepView: boolean = false): string {
  const isExpanded = expandedCustomers.has(customer.id);
  const gsepProject = gsepProjects[customer.mainId];
  const gsepDisplay = gsepProject ? `${gsepProject.projectNumber} (${gsepProject.year})` : 'N/A';
  const isInEditMode = inlineEditingCustomerId === customer.id;
  const daysToStart = calculateDaysToStart(gsepProject?.year);
  const totalBtu = customer.appliances.reduce((sum, app) => sum + app.btuPerHour, 0);

  const colspan = 11;

  const btuCellHtml = `<td class="td-numeric">${totalBtu > 0 ? totalBtu.toLocaleString() : 'N/A'}</td>`;

  const middleColumns = isGsepView
    ? `
        <td>${customer.town}</td>
        <td><span class="status-badge status-${customer.status.toLowerCase()}">${customer.status}</span></td>
        <td>${customer.mainId}</td>
        <td>${customer.serviceId}</td>
        <td>${customer.meterNumber}</td>
        ${btuCellHtml}
      `
    : `
        <td><span class="status-badge status-${customer.status.toLowerCase()}">${customer.status}</span></td>
        ${btuCellHtml}
        <td>${customer.mainId}</td>
        <td>${customer.serviceId}</td>
        <td>${customer.meterNumber}</td>
        <td>${gsepDisplay}</td>
      `;

  return `
    <tr class="customer-main-row" data-action="expand" data-customer-id="${customer.id}">
      <td><strong>${customer.name}</strong></td>
      <td>${customer.address}</td>
      ${middleColumns}
      <td><span class="days-to-start ${daysToStart.className}">${daysToStart.text}</span></td>
      <td>${customer.lastContacted}</td>
      <td class="actions">
        <button class="action-btn" data-action="log" data-customer-id="${customer.id}">Log Interaction</button>
        <div class="actions-menu">
          <button class="actions-menu-btn" data-action="toggle-menu" data-customer-id="${customer.id}">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
          </button>
          <div class="actions-dropdown ${openActionMenus.has(customer.id) ? '' : 'hidden'}" data-menu-for="${customer.id}">
             <button class="delete-btn" data-action="delete" data-customer-id="${customer.id}">Delete</button>
          </div>
        </div>
      </td>
    </tr>
    <tr class="customer-details-row ${isExpanded ? '' : 'hidden'}" data-details-for="${customer.id}">
      <td colspan="${colspan}">
        ${isInEditMode ? renderCustomerEditForm(customer) : renderCustomerDetails(customer)}
      </td>
    </tr>
  `;
}

function renderAcknowledgmentWidget(customer: Customer): string {
    switch(customer.acknowledgmentStatus) {
        case 'Not Sent':
            return `
                <div class="ack-status">
                    <span class="status-indicator not-sent"></span> Not Sent
                </div>
                <div class="ack-action">
                    <button class="action-btn" data-action="generate-ack" data-customer-id="${customer.id}">Generate Form</button>
                </div>
            `;
        case 'Sent':
            return `
                <div class="ack-status">
                    <span class="status-indicator sent"></span> Sent
                </div>
                <div class="ack-action">
                    <button class="action-btn" data-action="mark-signed" data-customer-id="${customer.id}">Mark as Signed</button>
                </div>
            `;
        case 'Signed':
            return `
                <div class="ack-status">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="status-indicator signed"><polyline points="20 6 9 17 4 12"></polyline></svg>
                     Signed
                </div>
                <div class="ack-action"></div>
            `;
        default:
            return '';
    }
}

function renderLetterOutreachWidget(customer: Customer): string {
    const letters = [1, 2, 3, 4, 5];
    const sentLetters = Object.keys(customer.letterStatus).map(Number);
    const nextLetter = letters.find(l => !sentLetters.includes(l));
    const isPaused = customer.status === 'Responded';

    let content = letters.map(letterNum => {
        const isSent = sentLetters.includes(letterNum);
        const isNext = letterNum === nextLetter;
        let statusClass = '';
        if (isSent) statusClass = 'sent';
        else if (isNext && !isPaused) statusClass = 'next';
        else if (isPaused) statusClass = 'disabled';

        return `
            <div class="step-item ${statusClass}">
                <div class="step-circle">${isSent ? '&#10003;' : letterNum}</div>
                <div class="step-label">Letter ${letterNum}</div>
                <div class="step-date">${isSent ? customer.letterStatus[letterNum] : ''}</div>
                ${isNext && !isPaused ? `<button class="send-letter-btn" data-action="send-letter" data-customer-id="${customer.id}" data-letter-number="${letterNum}">Send</button>` : ''}
            </div>
        `;
    }).join('<div class="step-connector"></div>');
    
    let message = '';
    if (isPaused) {
        message = '<p class="outreach-message info">Customer has responded. Letter outreach is paused.</p>';
    } else if (!nextLetter) {
        message = '<p class="outreach-message success">Full letter sequence sent.</p>';
    }

    return `
        <div class="letter-outreach-widget">
            <div class="letter-stepper">${content}</div>
            ${message}
        </div>
    `;
}

function renderCommentsWidget(customer: Customer): string {
    if (editingCommentsForCustomerId === customer.id) {
        return `
            <div class="comments-widget">
                <form class="comments-edit-form" data-action="save-comments" data-customer-id="${customer.id}">
                    <textarea name="comments" rows="5" placeholder="Add comments here...">${customer.comments}</textarea>
                    <div class="comments-actions">
                        <button type="button" class="cancel-btn" data-action="cancel-comments-edit" data-customer-id="${customer.id}">Cancel</button>
                        <button type="submit" class="action-btn">Save Comments</button>
                    </div>
                </form>
            </div>
        `;
    }

    return `
        <div class="comments-widget">
            <div class="comments-display">
                ${customer.comments ? `<p>${customer.comments.replace(/\n/g, '<br>')}</p>` : '<p class="no-comments">No comments yet.</p>'}
            </div>
            <div class="comments-actions">
                <button class="action-btn" data-action="start-comments-edit" data-customer-id="${customer.id}">Edit</button>
            </div>
        </div>
    `;
}

function renderAppliancesView(appliances: Appliance[]): string {
    if (appliances.length === 0) {
        return '<p class="no-comments">No natural gas appliances logged.</p>';
    }

    const totalBtu = appliances.reduce((sum, app) => sum + app.btuPerHour, 0);

    return `
        <div class="appliances-list-view">
            <table>
                <thead>
                    <tr>
                        <th>Appliance Name</th>
                        <th>BTU/HR</th>
                    </tr>
                </thead>
                <tbody>
                    ${appliances.map(app => `
                        <tr>
                            <td>${app.name}</td>
                            <td>${app.btuPerHour.toLocaleString()}</td>
                        </tr>
                    `).join('')}
                </tbody>
                <tfoot>
                    <tr>
                        <td><strong>Total BTU/HR</strong></td>
                        <td><strong>${totalBtu.toLocaleString()}</strong></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    `;
}

function renderCustomerDetails(customer: Customer): string {
 const gsepProject = gsepProjects[customer.mainId];
 const daysToStart = calculateDaysToStart(gsepProject?.year);
 return `
    <div class="details-content">
        <div class="details-group">
          <h4>Usage & Service Details</h4>
          <div class="details-grid">
            <div class="detail-item"><strong>Electric Provider</strong> ${customer.electricProvider}</div>
            <div class="detail-item"><strong>Customer Rate Class</strong> ${customer.rateClassCode}</div>
            <div class="detail-item"><strong>Annual Elec. Usage</strong> ${customer.annualElectricalUsageKWH.toLocaleString()} kWh</div>
            <div class="detail-item"><strong>Annual Heat Load</strong> ${customer.annualHeatLoadTherms.toLocaleString()} Therms</div>
            <div class="detail-item"><strong>Annual Base Load</strong> ${customer.annualBaseLoadTherms.toLocaleString()} Therms</div>
            <div class="detail-item"><strong>Service ID</strong> ${customer.serviceId}</div>
            <div class="detail-item"><strong>Meter Number</strong> ${customer.meterNumber}</div>
            <div class="detail-item"><strong>Days to Start</strong> <span class="days-to-start ${daysToStart.className}">${daysToStart.text}</span></div>
          </div>
        </div>
        <div class="details-group">
          <h4>Profile & Financials</h4>
          <div class="details-grid">
            <div class="detail-item"><strong>Email</strong> ${customer.email}</div>
            <div class="detail-item"><strong>Home Phone</strong> ${customer.phoneHome || 'N/A'}</div>
            <div class="detail-item"><strong>Cell Phone</strong> ${customer.phoneCell || 'N/A'}</div>
            <div class="detail-item"><strong>Work Phone</strong> ${customer.phoneWork || 'N/A'}</div>
            <div class="detail-item"><strong>Mailing Address</strong> ${customer.mailingAddress === customer.address ? 'Same as service address' : customer.mailingAddress}</div>
            <div class="detail-item"><strong>Customer Type</strong> ${customer.customerType}</div>
            <div class="detail-item"><strong>Contact Role</strong> ${customer.contactRole}</div>
            <div class="detail-item"><strong>Language</strong> ${customer.language}</div>
            <div class="detail-item"><strong>Low/Moderate-Income (LMI)</strong> ${customer.isLMI ? 'Yes' : 'No'}</div>
            <div class="detail-item"><strong>In EJ Community</strong> ${customer.isInEJCommunity ? 'Yes' : 'No'}</div>
            <div class="detail-item"><strong>Prior Efficiency Program</strong> ${customer.hasParticipatedInEfficiencyProgram ? 'Yes' : 'No'}</div>
            <div class="detail-item"><strong>Estimated Upfront Cost</strong> ${formatCurrency(customer.estimatedUpfrontCost)}</div>
            <div class="detail-item"><strong>Applied Incentives</strong> ${formatCurrency(customer.appliedIncentives)}</div>
          </div>
        </div>
        <div class="details-group full-width">
             <h4>Acknowledgment Process</h4>
             <div class="acknowledgment-widget">
                ${renderAcknowledgmentWidget(customer)}
             </div>
        </div>
        <div class="details-group full-width">
             <h4>Letter Outreach Sequence</h4>
             ${renderLetterOutreachWidget(customer)}
        </div>
         <div class="details-group full-width">
            <h4>Natural Gas Appliances</h4>
            ${renderAppliancesView(customer.appliances)}
        </div>
        <div class="details-group full-width">
            <h4>Comments</h4>
            ${renderCommentsWidget(customer)}
        </div>
        <h4 class="interaction-history-title">Interaction History</h4>
        <div class="interaction-history">
          ${customer.interactions.length > 0 ? `
            <ul>
              ${customer.interactions.slice().reverse().map(i => `
                <li>
                  <strong>${i.date} (${i.type}):</strong> ${i.notes}
                  ${i.topics && i.topics.length > 0 ? `<div class="topic-tags">${i.topics.map(t => `<span class="topic-tag">${t}</span>`).join('')}</div>` : ''}
                </li>`).join('')}
            </ul>
          ` : '<p>No interactions logged for this customer.</p>'}
        </div>
        <div class="details-actions">
            <button class="action-btn" data-action="start-inline-edit" data-customer-id="${customer.id}">Edit Customer</button>
        </div>
    </div>
 `;
}

function renderAppliancesForm(appliances: Appliance[], isModal: boolean, customerId: number | string): string {
    const totalBtu = appliances.reduce((sum, app) => sum + app.btuPerHour, 0);
    const actionPrefix = isModal ? '-modal' : '';
    const formId = isModal ? 'add-edit-form' : 'inline-edit-form';

    return `
        <div class="appliances-form-list" id="appliances-form-list-${customerId}">
            ${appliances.map(app => `
                <div class="appliance-form-row" data-appliance-id="${app.id}">
                    <div class="form-group">
                        <label for="app-name-${app.id}">Appliance Name</label>
                        <input type="text" id="app-name-${app.id}" name="applianceName" value="${app.name}" placeholder="e.g., Furnace">
                    </div>
                    <div class="form-group">
                        <label for="app-btu-${app.id}">BTU/HR</label>
                        <input type="number" id="app-btu-${app.id}" name="applianceBtu" value="${app.btuPerHour}" class="btu-input" step="1000">
                    </div>
                    <button type="button" class="remove-appliance-btn" data-action="remove-appliance${actionPrefix}" data-appliance-id="${app.id}" data-customer-id="${customerId}" aria-label="Remove Appliance">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </button>
                </div>
            `).join('')}
        </div>
        <div class="appliances-form-summary">
            <button type="button" class="add-appliance-btn" data-action="add-appliance${actionPrefix}" data-customer-id="${customerId}">+ Add Appliance</button>
            <div class="appliances-total">
                <label for="total-btu-${customerId}">Total BTU/HR</label>
                <input type="text" id="total-btu-${customerId}" value="${totalBtu.toLocaleString()}" readonly>
            </div>
        </div>
    `;
}

function renderCustomerEditForm(customer: Customer): string {
    const gsepProject = gsepProjects[customer.mainId];
    const gsepNumber = gsepProject ? gsepProject.projectNumber : '';
    const gsepYear = gsepProject ? gsepProject.year : '';
    const isMailingSameAsService = customer.mailingAddress === customer.address;

    return `
        <form class="inline-edit-form" id="inline-edit-form" data-customer-id="${customer.id}">
              <fieldset>
                <legend>Customer Info</legend>
                <div class="form-grid">
                  <div class="form-group"><label for="name-${customer.id}">Name ${renderInfoIcon('Full name of the customer or business.')}</label><input type="text" id="name-${customer.id}" name="name" required value="${customer.name}"></div>
                  <div class="form-group"><label for="email-${customer.id}">Email ${renderInfoIcon('Primary contact email for the customer.')}</label><input type="email" id="email-${customer.id}" name="email" required value="${customer.email}"></div>
                  <div class="form-group"><label for="phoneHome-${customer.id}">Home Phone ${renderInfoIcon('Home phone number.')}</label><input type="tel" id="phoneHome-${customer.id}" name="phoneHome" value="${customer.phoneHome || ''}"></div>
                  <div class="form-group"><label for="phoneCell-${customer.id}">Cell Phone ${renderInfoIcon('Cell phone number.')}</label><input type="tel" id="phoneCell-${customer.id}" name="phoneCell" value="${customer.phoneCell || ''}"></div>
                  <div class="form-group"><label for="phoneWork-${customer.id}">Work Phone ${renderInfoIcon('Work phone number.')}</label><input type="tel" id="phoneWork-${customer.id}" name="phoneWork" value="${customer.phoneWork || ''}"></div>
                  <div class="form-group" style="grid-column: 1 / -1;"><label for="address-${customer.id}">Service Address ${renderInfoIcon('Full service address including street and unit number.')}</label><input type="text" id="address-${customer.id}" name="address" required value="${customer.address}" placeholder="e.g., 123 Main St, Apt 4B"></div>
                  <div class="form-group" style="grid-column: 1 / -1;"><label for="mailingAddress-${customer.id}">Mailing Address ${renderInfoIcon('The mailing address for correspondence. If same as service address, check the box below.')}</label><input type="text" id="mailingAddress-${customer.id}" name="mailingAddress" value="${customer.mailingAddress}" placeholder="e.g., PO Box 123"></div>
                  <div class="form-group-checkbox" style="grid-column: 1 / -1;">
                      <input type="checkbox" id="same-as-address-${customer.id}" name="sameAsAddress" ${isMailingSameAsService ? 'checked' : ''}>
                      <label for="same-as-address-${customer.id}">Mailing address is the same as service address</label>
                  </div>
                  <div class="form-group"><label for="town-${customer.id}">Town ${renderInfoIcon('The town where the service address is located.')}</label><select id="town-${customer.id}" name="town" required>${towns.map(t => `<option value="${t}" ${customer.town === t ? 'selected' : ''}>${t}</option>`).join('')}</select></div>
                  <div class="form-group"><label for="contact-role-${customer.id}">Contact Role ${renderInfoIcon('The role of the contact person (e.g., Owner, Tenant).')}</label><select id="contact-role-${customer.id}" name="contactRole" required>${contactRoles.map(r => `<option value="${r}" ${customer.contactRole === r ? 'selected' : ''}>${r}</option>`).join('')}</select></div>
                  <div class="form-group"><label for="language-${customer.id}">Language ${renderInfoIcon("The customer's preferred language for communication.")}</label><select id="language-${customer.id}" name="language" required>${languages.map(l => `<option value="${l}" ${customer.language === l ? 'selected' : ''}>${l}</option>`).join('')}</select></div>
                </div>
              </fieldset>
              <fieldset>
                <legend>Usage Data</legend>
                <div class="form-grid" style="grid-template-columns: repeat(2, 1fr);">
                  <div class="form-group"><label for="electric-provider-${customer.id}">Electric Provider ${renderInfoIcon('The electric utility for this address. Automatically set based on the selected Town.')}</label><input type="text" id="electric-provider-${customer.id}" readonly value="${customer.electricProvider}"></div>
                  <div class="form-group"><label for="rate-class-code-${customer.id}">Customer Rate Class Code ${renderInfoIcon("Unitil's gas rate classification for this customer.")}</label><select id="rate-class-code-${customer.id}" name="rateClassCode" required>${rateClassCodes.map(c => `<option value="${c}" ${customer.rateClassCode === c ? 'selected' : ''}>${c}</option>`).join('')}</select></div>
                  <div class="form-group"><label for="annual-electrical-usage-${customer.id}">Annual Elec. Usage (kWh) ${renderInfoIcon('Total electricity consumed in the last 12 months, measured in kilowatt-hours.')}</label><input type="number" id="annual-electrical-usage-${customer.id}" name="annualElectricalUsageKWH" value="${customer.annualElectricalUsageKWH}" step="1"></div>
                  <div class="form-group"><label for="annual-heat-load-${customer.id}">Annual Heat Load (Therms) ${renderInfoIcon('The portion of annual gas usage for heating, measured in therms.')}</label><input type="number" id="annual-heat-load-${customer.id}" name="annualHeatLoadTherms" value="${customer.annualHeatLoadTherms}" step="1"></div>
                  <div class="form-group" style="grid-column: 1 / 2;"><label for="annual-base-load-${customer.id}">Annual Base Load (Therms) ${renderInfoIcon('The portion of annual gas usage for non-heating purposes (e.g., hot water, cooking), measured in therms.')}</label><input type="number" id="annual-base-load-${customer.id}" name="annualBaseLoadTherms" value="${customer.annualBaseLoadTherms}" step="1"></div>
                </div>
              </fieldset>
              <fieldset>
                <legend>Service Details</legend>
                <div class="form-grid" style="grid-template-columns: repeat(2, 1fr);">
                  <div class="form-group"><label for="main-id-${customer.id}">Main ID ${renderInfoIcon("The unique identifier for the customer's main account.")}</label><input type="text" id="main-id-${customer.id}" name="mainId" required value="${customer.mainId}"></div>
                  <div class="form-group"><label for="service-id-${customer.id}">Service ID ${renderInfoIcon('The unique identifier for the specific service point.')}</label><input type="text" id="service-id-${customer.id}" name="serviceId" required value="${customer.serviceId}"></div>
                  <div class="form-group"><label for="gsep-project-number-${customer.id}">GSEP Project Number ${renderInfoIcon('The identifier for the associated Gas System Enhancement Program (GSEP) project.')}</label><input type="text" id="gsep-project-number-${customer.id}" name="gsepProjectNumber" value="${gsepNumber}"></div>
                  <div class="form-group"><label for="gsep-project-year-${customer.id}">GSEP Project Year ${renderInfoIcon('The planned construction year for the GSEP project.')}</label><input type="number" id="gsep-project-year-${customer.id}" name="gsepProjectYear" value="${gsepYear}" placeholder="e.g., 2025"></div>
                  <div class="form-group" style="grid-column: 1 / -1;"><label for="meter-number-${customer.id}">Meter Number ${renderInfoIcon('The serial number of the gas meter at the service address.')}</label><input type="text" id="meter-number-${customer.id}" name="meterNumber" required value="${customer.meterNumber}"></div>
                </div>
              </fieldset>
              <fieldset>
                 <legend>Natural Gas Appliances</legend>
                 ${renderAppliancesForm(customer.appliances, false, customer.id)}
              </fieldset>
              <fieldset>
                <legend>Classification & Financials</legend>
                <div class="form-grid">
                  <div class="form-group"><label for="customer-type-${customer.id}">Customer Type ${renderInfoIcon('The classification of the customer (e.g., Residential, Commercial).')}</label><select id="customer-type-${customer.id}" name="customerType" required>${customerTypes.map(t => `<option value="${t}" ${customer.customerType === t ? 'selected' : ''}>${t}</option>`).join('')}</select></div>
                  <div class="form-group"><label for="acknowledgment-status-${customer.id}">Acknowledgment Status ${renderInfoIcon("The current status of the customer's acknowledgment form for electrification alternatives.")}</label><select id="acknowledgment-status-${customer.id}" name="acknowledgmentStatus" required>${acknowledgmentStatuses.map(s => `<option value="${s}" ${customer.acknowledgmentStatus === s ? 'selected' : ''}>${s}</option>`).join('')}</select></div>
                  <div class="form-group"><label for="status-${customer.id}">Status ${renderInfoIcon('The current stage of the customer in the outreach funnel.')}</label><select id="status-${customer.id}" name="status" required>${statuses.map(s => `<option value="${s}" ${customer.status === s ? 'selected' : ''}>${s}</option>`).join('')}</select></div>
                  <div class="form-group"><label for="estimated-upfront-cost-${customer.id}">Est. Upfront Cost ${renderInfoIcon('The estimated initial cost for the customer to electrify their heating system.')}</label><input type="number" id="estimated-upfront-cost-${customer.id}" name="estimatedUpfrontCost" value="${customer.estimatedUpfrontCost}" step="100"></div>
                  <div class="form-group"><label for="applied-incentives-${customer.id}">Applied Incentives ${renderInfoIcon('The total value of incentives applied to reduce the upfront cost.')}</label><input type="number" id="applied-incentives-${customer.id}" name="appliedIncentives" value="${customer.appliedIncentives}" step="100"></div>
                  <div class="form-group-checkbox" style="grid-column: 1 / -1; display:flex; gap: 2rem;">
                      <div><input type="checkbox" id="is-lmi-${customer.id}" name="isLMI" ${customer.isLMI ? 'checked' : ''}><label for="is-lmi-${customer.id}">LMI ${renderInfoIcon('Check if the customer is classified as Low-to-Moderate Income.')}</label></div>
                      <div><input type="checkbox" id="has-participated-${customer.id}" name="hasParticipated" ${customer.hasParticipatedInEfficiencyProgram ? 'checked' : ''}><label for="has-participated-${customer.id}">Prior Program ${renderInfoIcon('Check if the customer has previously participated in an energy efficiency program.')}</label></div>
                      <div><input type="checkbox" id="is-ej-${customer.id}" name="isInEJCommunity" ${customer.isInEJCommunity ? 'checked' : ''}><label for="is-ej-${customer.id}">EJ Community ${renderInfoIcon('Check if the service address is located within an Environmental Justice community.')}</label></div>
                  </div>
                </div>
              </fieldset>
              <fieldset>
                 <legend>Comments</legend>
                 <div class="form-group">
                    <label for="comments-${customer.id}">Internal Comments ${renderInfoIcon('Free-form notes for internal tracking. Not shared with the customer.')}</label>
                    <textarea id="comments-${customer.id}" name="comments" rows="4">${customer.comments}</textarea>
                 </div>
              </fieldset>
              <div class="details-actions">
                 <button type="submit" class="submit-btn">Save Changes</button>
                 <button type="button" class="cancel-btn" data-action="cancel-inline-edit" data-customer-id="${customer.id}">Cancel</button>
              </div>
        </form>
    `;
}

// --- Modal Rendering ---
function renderModals(modalContainer: HTMLElement) {
    let modalContent = '';
    if (activeModal === 'add') {
      if (!newCustomerForModal) { // Initialize if not already set
        newCustomerForModal = {
          name: '', email: '', phoneHome: '', phoneCell: '', phoneWork: '', mainId: '', serviceId: '',
          meterNumber: '', address: '', mailingAddress: '', town: activeTown,
          contactRole: 'Unknown', customerType: 'Residential', status: 'New',
          acknowledgmentStatus: 'Not Sent', isLMI: false, hasParticipatedInEfficiencyProgram: false,
          isInEJCommunity: false, estimatedUpfrontCost: 0, appliedIncentives: 0,
          annualHeatLoadTherms: 0, annualBaseLoadTherms: 0, annualElectricalUsageKWH: 0,
          electricProvider: activeTown === 'Fitchburg' ? 'Unitil' : 'National Grid',
          language: 'English', rateClassCode: 'R-2', appliances: [], comments: '',
        };
      }
      modalContent = `
        <div class="modal-overlay">
          <div class="modal-content">
            <button class="close-btn" data-action="close-modal">&times;</button>
            <h3>Add New Customer</h3>
            <form id="add-edit-form">
              <fieldset>
                <legend>Customer Info</legend>
                <div class="form-grid">
                  <div class="form-group"><label for="name">Name ${renderInfoIcon('Full name of the customer or business.')}</label><input type="text" name="name" required value=""></div>
                  <div class="form-group"><label for="email">Email ${renderInfoIcon('Primary contact email for the customer.')}</label><input type="email" name="email" required value=""></div>
                  <div class="form-group"><label for="phoneHome">Home Phone ${renderInfoIcon('Home phone number.')}</label><input type="tel" name="phoneHome" value=""></div>
                  <div class="form-group"><label for="phoneCell">Cell Phone ${renderInfoIcon('Cell phone number.')}</label><input type="tel" name="phoneCell" value=""></div>
                  <div class="form-group"><label for="phoneWork">Work Phone ${renderInfoIcon('Work phone number.')}</label><input type="tel" name="phoneWork" value=""></div>
                  <div class="form-group" style="grid-column: 1 / -1;"><label for="address">Service Address ${renderInfoIcon('Full service address including street and unit number.')}</label><input type="text" name="address" required value="" placeholder="e.g., 123 Main St, Apt 4B"></div>
                  <div class="form-group" style="grid-column: 1 / -1;"><label for="mailingAddress">Mailing Address ${renderInfoIcon('The mailing address for correspondence. If same as service address, check the box below.')}</label><input type="text" name="mailingAddress" value="" placeholder="e.g., PO Box 123"></div>
                  <div class="form-group-checkbox" style="grid-column: 1 / -1;">
                      <input type="checkbox" id="same-as-address" name="sameAsAddress" checked>
                      <label for="same-as-address">Mailing address is the same as service address</label>
                  </div>
                  <div class="form-group"><label for="town">Town ${renderInfoIcon('The town where the service address is located.')}</label><select id="town" name="town" required>${towns.map(t => `<option value="${t}" ${newCustomerForModal?.town === t ? 'selected' : ''}>${t}</option>`).join('')}</select></div>
                  <div class="form-group"><label for="contact-role">Contact Role ${renderInfoIcon('The role of the contact person (e.g., Owner, Tenant).')}</label><select name="contactRole" required>${contactRoles.map(r => `<option value="${r}">${r}</option>`).join('')}</select></div>
                  <div class="form-group"><label for="language">Language ${renderInfoIcon("The customer's preferred language for communication.")}</label><select name="language" required>${languages.map(l => `<option value="${l}" ${newCustomerForModal?.language === l ? 'selected' : ''}>${l}</option>`).join('')}</select></div>
                </div>
              </fieldset>
              <fieldset>
                <legend>Usage Data</legend>
                <div class="form-grid" style="grid-template-columns: repeat(2, 1fr);">
                  <div class="form-group"><label for="electric-provider">Electric Provider ${renderInfoIcon('The electric utility for this address. Automatically set based on the selected Town.')}</label><input type="text" id="electric-provider" readonly value="${newCustomerForModal?.electricProvider}"></div>
                  <div class="form-group"><label for="rateClassCode">Customer Rate Class Code ${renderInfoIcon("Unitil's gas rate classification for this customer.")}</label><select name="rateClassCode" required>${rateClassCodes.map(c => `<option value="${c}" ${c === 'R-2' ? 'selected' : ''}>${c}</option>`).join('')}</select></div>
                  <div class="form-group"><label for="annual-electrical-usage">Annual Elec. Usage (kWh) ${renderInfoIcon('Total electricity consumed in the last 12 months, measured in kilowatt-hours.')}</label><input type="number" name="annualElectricalUsageKWH" value="0" step="1"></div>
                  <div class="form-group"><label for="annual-heat-load">Annual Heat Load (Therms) ${renderInfoIcon('The portion of annual gas usage for heating, measured in therms.')}</label><input type="number" name="annualHeatLoadTherms" value="0" step="1"></div>
                  <div class="form-group" style="grid-column: 1 / 2;"><label for="annual-base-load">Annual Base Load (Therms) ${renderInfoIcon('The portion of annual gas usage for non-heating purposes (e.g., hot water, cooking), measured in therms.')}</label><input type="number" name="annualBaseLoadTherms" value="0" step="1"></div>
                </div>
              </fieldset>
              <fieldset>
                <legend>Service Details</legend>
                <div class="form-grid" style="grid-template-columns: repeat(2, 1fr);">
                  <div class="form-group"><label for="main-id">Main ID ${renderInfoIcon("The unique identifier for the customer's main account.")}</label><input type="text" name="mainId" required value=""></div>
                  <div class="form-group"><label for="service-id">Service ID ${renderInfoIcon('The unique identifier for the specific service point.')}</label><input type="text" name="serviceId" required value=""></div>
                  <div class="form-group"><label for="gsep-project-number">GSEP Project Number ${renderInfoIcon('The identifier for the associated Gas System Enhancement Program (GSEP) project.')}</label><input type="text" name="gsepProjectNumber" value=""></div>
                  <div class="form-group"><label for="gsep-project-year">GSEP Project Year ${renderInfoIcon('The planned construction year for the GSEP project.')}</label><input type="number" name="gsepProjectYear" value="" placeholder="e.g., 2025"></div>
                  <div class="form-group" style="grid-column: 1 / -1;"><label for="meter-number">Meter Number ${renderInfoIcon('The serial number of the gas meter at the service address.')}</label><input type="text" name="meterNumber" required value=""></div>
                </div>
              </fieldset>
               <fieldset>
                 <legend>Natural Gas Appliances</legend>
                 ${renderAppliancesForm(newCustomerForModal?.appliances || [], true, 'new')}
              </fieldset>
              <fieldset>
                <legend>Classification & Financials</legend>
                <div class="form-grid">
                  <div class="form-group"><label for="customer-type">Customer Type ${renderInfoIcon('The classification of the customer (e.g., Residential, Commercial).')}</label><select name="customerType" required>${customerTypes.map(t => `<option value="${t}">${t}</option>`).join('')}</select></div>
                  <div class="form-group"><label for="acknowledgment-status">Acknowledgment Status ${renderInfoIcon("The current status of the customer's acknowledgment form for electrification alternatives.")}</label><select name="acknowledgmentStatus" required>${acknowledgmentStatuses.map(s => `<option value="${s}">${s}</option>`).join('')}</select></div>
                   <div class="form-group"><label for="status">Status ${renderInfoIcon('The current stage of the customer in the outreach funnel.')}</label><select name="status" required>${statuses.map(s => `<option value="${s}" ${newCustomerForModal?.status === s ? 'selected' : ''}>${s}</option>`).join('')}</select></div>
                  <div class="form-group"><label for="estimated-upfront-cost">Est. Upfront Cost ${renderInfoIcon('The estimated initial cost for the customer to electrify their heating system.')}</label><input type="number" name="estimatedUpfrontCost" value="0" step="100"></div>
                  <div class="form-group"><label for="applied-incentives">Applied Incentives ${renderInfoIcon('The total value of incentives applied to reduce the upfront cost.')}</label><input type="number" name="appliedIncentives" value="0" step="100"></div>
                  <div class="form-group-checkbox" style="grid-column: 1 / -1; display:flex; gap: 2rem;">
                      <div><input type="checkbox" id="is-lmi" name="isLMI"><label for="is-lmi">LMI ${renderInfoIcon('Check if the customer is classified as Low-to-Moderate Income.')}</label></div>
                      <div><input type="checkbox" id="has-participated" name="hasParticipated"><label for="has-participated">Prior Program ${renderInfoIcon('Check if the customer has previously participated in an energy efficiency program.')}</label></div>
                      <div><input type="checkbox" id="is-ej" name="isInEJCommunity"><label for="is-ej">EJ Community ${renderInfoIcon('Check if the service address is located within an Environmental Justice community.')}</label></div>
                  </div>
                </div>
              </fieldset>
              <fieldset>
                 <legend>Comments</legend>
                 <div class="form-group">
                    <label for="comments">Internal Comments ${renderInfoIcon('Free-form notes for internal tracking. Not shared with the customer.')}</label>
                    <textarea name="comments" rows="4"></textarea>
                 </div>
              </fieldset>
              <button type="submit" class="submit-btn">Add Customer</button>
            </form>
          </div>
        </div>
      `;
    } else if (activeModal === 'log' && editingCustomer) {
       modalContent = `
        <div class="modal-overlay">
          <div class="modal-content modal-log">
            <button class="close-btn" data-action="close-modal">&times;</button>
            <h3>Log Interaction for ${editingCustomer.name}</h3>
            <form id="log-interaction-form">
              <div class="form-grid form-grid-log">
                  <div class="form-group">
                    <label for="interaction-type">Interaction Type</label>
                    <select name="interactionType" required>${interactionTypes.map(t => `<option>${t}</option>`).join('')}</select>
                  </div>
                   <div class="form-group">
                    <label for="interaction-date">Date</label>
                    <input type="date" name="interactionDate" required value="${new Date().toISOString().split('T')[0]}">
                  </div>
              </div>
              <div class="form-group">
                <label for="notes">Notes</label>
                <textarea name="notes" rows="4" required></textarea>
              </div>
              <div class="form-group">
                <label>Topics Discussed</label>
                <div class="checkbox-group">
                    ${outreachTopics.map(topic => {
                        const topicId = `topic-${topic.replace(/[\s/&]+/g, '-')}`;
                        return `
                        <div class="checkbox-item">
                            <input type="checkbox" id="${topicId}" name="topics" value="${topic}">
                            <label for="${topicId}">${topic}</label>
                        </div>
                        `
                    }).join('')}
                </div>
              </div>
              <button type="submit" class="submit-btn">Log Interaction</button>
            </form>
          </div>
        </div>
      `;
    } else if (activeModal === 'acknowledgment' && editingCustomer) {
        const formText = `This form confirms that you, the customer, have been informed of electrification options and have chosen to proceed with obtaining natural gas service. By signing, you acknowledge that you have received information on:\n\n- Alternatives to natural gas available to you.\n- Available incentives for these alternatives.\n- The benefits of electric heat pumps.`;
        modalContent = `
         <div class="modal-overlay">
           <div class="modal-content">
             <button class="close-btn" data-action="close-modal">&times;</button>
             <h3>Acknowledgment Form Content</h3>
             <p>Use the following text for the customer acknowledgment form. You can copy this text to send to ${editingCustomer.name}.</p>
             <div class="form-text-display">
                <pre>${formText}</pre>
             </div>
             <div class="modal-actions">
                <button class="cancel-btn" data-action="close-modal">Close</button>
                <button class="submit-btn" data-action="mark-ack-sent" data-customer-id="${editingCustomer.id}">Mark as Sent & Close</button>
             </div>
           </div>
         </div>
       `;
    }
    modalContainer.innerHTML = modalContent;
    if (activeModal === 'add') {
        const form = document.getElementById('add-edit-form');
        if (form) {
            const townSelect = form.querySelector('#town') as HTMLSelectElement;
            if (townSelect) {
                townSelect.addEventListener('change', () => {
                    const providerInput = document.getElementById('electric-provider') as HTMLInputElement;
                    if (providerInput) {
                        providerInput.value = townSelect.value === 'Fitchburg' ? 'Unitil' : 'National Grid';
                    }
                });
            }
            setupMailingAddressSync(form);
        }
    }
}

function renderReportBuilderView(): string {
    return `
        <div class="report-builder-view">
            <div class="dashboard-card">
                <div class="card-title">Create Customer Report</div>
                <p>Select criteria to build a customized PDF report. Leave a section blank to include all options for that category.</p>
                <form id="report-builder-form">
                    <fieldset>
                        <legend>Town</legend>
                        <div class="radio-group">
                            <div class="radio-item">
                                <input type="radio" id="town-all" name="town" value="All" checked>
                                <label for="town-all">All</label>
                            </div>
                            ${towns.map(town => `
                                <div class="radio-item">
                                    <input type="radio" id="town-${town}" name="town" value="${town}">
                                    <label for="town-${town}">${town}</label>
                                </div>
                            `).join('')}
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Outreach Status</legend>
                        <div class="checkbox-group report-builder-checkboxes">
                            ${statuses.map(status => `
                                <div class="checkbox-item">
                                    <input type="checkbox" id="status-${status}" name="status" value="${status}">
                                    <label for="status-${status}">${status}</label>
                                </div>
                            `).join('')}
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Customer Type</legend>
                        <div class="checkbox-group report-builder-checkboxes">
                            ${customerTypes.map(type => {
                                const typeId = `type-${type.replace(/[\s/&]+/g, '-')}`;
                                return `
                                <div class="checkbox-item">
                                    <input type="checkbox" id="${typeId}" name="customerType" value="${type}">
                                    <label for="${typeId}">${type}</label>
                                </div>
                                `
                            }).join('')}
                        </div>
                    </fieldset>
                    <div class="report-builder-actions">
                        <button type="button" class="cancel-btn" data-action="cancel-report-builder">Cancel</button>
                        <button type="submit" class="header-action-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                            Generate Report
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

// --- Event Handling ---
function handleBtuCalculation(form: HTMLFormElement) {
    const btuInputs = form.querySelectorAll<HTMLInputElement>('.btu-input');
    let total = 0;
    btuInputs.forEach(input => {
        total += parseInt(input.value, 10) || 0;
    });
    const totalInput = form.querySelector<HTMLInputElement>('input[id^="total-btu-"]');
    if (totalInput) {
        totalInput.value = total.toLocaleString();
    }
}

function handleAppClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const actionTarget = target.closest<HTMLElement>('[data-action]');
    const navTarget = target.closest<HTMLElement>('[data-view]');

    if (navTarget) {
      const view = navTarget.dataset.view as 'dashboard' | 'customers' | 'gsep' | 'resources' | 'mailers' | 'generateLetters';
      if (view !== activeView) {
        activeView = view;
        renderApp();
      }
      return;
    }
    
    // Handle actions that are pure side-effects first
    if (actionTarget) {
        const action = actionTarget.dataset.action;
        if (action === 'export-data') {
            handleExportData();
            return;
        }
        if (action === 'import-data') {
            handleImportData();
            return;
        }
        if (action === 'download-report') {
            handleDownloadReport();
            return;
        }
        if (action === 'show-report-builder') {
            activeView = 'reportBuilder';
            renderApp();
            return;
        }
        if (action === 'generate-pdf') {
            const customersForBatch = getCustomersForNextLetterBatch();

            if (customersForBatch.length === 0) {
                alert("No customers are due for their next letter at this time.");
                return;
            }

            // 1. Generate Letter HTML
            let lettersHtml = '<div class="letter-container">';
            for (const { customer, nextLetterNumber } of customersForBatch) {
                const template = mailerTemplates[nextLetterNumber - 1];
                if (!template) continue;

                let letterContent = template.content
                    .replace(/\[Customer Name\]/g, customer.name)
                    .replace(/\[Customer Mailing Address\]/g, customer.mailingAddress);

                lettersHtml += `<div class="letter-page"><pre>${letterContent}</pre></div>`;
            }
            lettersHtml += '</div>';

            // 2. Generate Mailing Label HTML
            let labelsHtml = '<div class="label-sheet">';
            for (const { customer } of customersForBatch) {
                const addressHtml = customer.mailingAddress.replace(/\n/g, '<br>');
                labelsHtml += `
                    <div class="label-item">
                        ${customer.name}<br>
                        ${addressHtml}
                    </div>
                `;
            }
            labelsHtml += '</div>';

            const printStyles = `
                @page {
                    size: letter;
                    margin: 0;
                }
                body { 
                    font-family: sans-serif; 
                    line-height: 1.6; 
                    color: #333; 
                    margin: 0; 
                }
                /* Letter Styles */
                .letter-page {
                    padding: 1in;
                    box-sizing: border-box;
                    width: 8.5in;
                    height: 11in;
                    page-break-after: always;
                    overflow: hidden;
                }
                .letter-container .letter-page:last-child {
                    page-break-after: auto;
                }
                pre {
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    font-family: inherit;
                    font-size: 11pt;
                }
                
                /* Mailing Label Styles (Avery 5160 equivalent) */
                .label-sheet {
                    display: grid;
                    grid-template-columns: repeat(3, 2.75in);
                    grid-template-rows: repeat(10, 1in);
                    justify-content: center;
                    align-content: center;
                    width: 8.5in;
                    height: 11in;
                    box-sizing: border-box;
                    page-break-before: always;
                    overflow: hidden;
                }
                .label-item {
                    padding: 0.15in;
                    box-sizing: border-box;
                    overflow: hidden;
                    font-size: 10pt;
                    line-height: 1.4;
                }

                @media screen {
                    .label-item {
                        border: 1px dotted #ccc;
                    }
                }

                @media print {
                    .label-item {
                        border: none;
                    }
                }
            `;

            const printWindow = window.open('', '_blank');
            if (printWindow) {
                printWindow.document.write(`
                    <html>
                        <head>
                            <title>Master Letter & Mailing Label Document</title>
                            <style>${printStyles}</style>
                        </head>
                        <body>
                            ${lettersHtml}
                            ${labelsHtml}
                        </body>
                    </html>
                `);
                printWindow.document.close();
                printWindow.focus();
                
                // IMPORTANT: Update customer data after generating
                const today = new Date().toISOString().split('T')[0];
                for (const { customer, nextLetterNumber } of customersForBatch) {
                    customer.letterStatus[nextLetterNumber] = today;
                    customer.lastContacted = today;
                }
                
                // Re-render the app to reflect the changes immediately
                renderApp();

            } else {
                alert("Could not open a new window. Please disable your pop-up blocker.");
            }
            return;
        }
        if (action === 'copy-mailer') {
            const mailerContentElement = actionTarget.previousElementSibling?.querySelector('.mailer-body');
            if (mailerContentElement) {
                const textToCopy = (mailerContentElement as HTMLElement).innerText;
                navigator.clipboard.writeText(textToCopy).then(() => {
                    actionTarget.innerHTML = 'Copied!';
                    actionTarget.classList.add('copied');
                    setTimeout(() => {
                        actionTarget.innerHTML = `
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                               <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                               <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zM-1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1z"/>
                            </svg>
                            Copy to Clipboard`;
                        actionTarget.classList.remove('copied');
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                    actionTarget.textContent = 'Copy Failed';
                });
            }
            return;
        }
    }


    if (!actionTarget) return;

    const action = actionTarget.dataset.action;
    const customerId = actionTarget.dataset.customerId ? parseInt(actionTarget.dataset.customerId, 10) : null;
    
    if (action !== 'toggle-menu' && openActionMenus.size > 0) {
        openActionMenus.clear();
        // Re-render only if something needs to close, otherwise continue to action
    } else if (action === 'toggle-menu') {
        event.stopPropagation();
        if (customerId) {
            const wasOpen = openActionMenus.has(customerId);
            openActionMenus.clear();
            if (!wasOpen) openActionMenus.add(customerId);
        }
        renderApp();
        return;
    }
    
    switch (action) {
        case 'add':
            editingCustomer = null;
            inlineEditingCustomerId = null;
            activeModal = 'add';
            break;
        case 'log':
            if (customerId) {
                editingCustomer = customers.find(c => c.id === customerId) || null;
                activeModal = 'log';
            }
            break;
        case 'generate-ack':
             if (customerId) {
                editingCustomer = customers.find(c => c.id === customerId) || null;
                activeModal = 'acknowledgment';
            }
            break;
        case 'mark-signed':
            if (customerId) {
                const customer = customers.find(c => c.id === customerId);
                if (customer) {
                    customer.acknowledgmentStatus = 'Signed';
                }
            }
            break;
        case 'send-letter':
            if (customerId) {
                const customer = customers.find(c => c.id === customerId);
                const letterNumber = actionTarget.dataset.letterNumber ? parseInt(actionTarget.dataset.letterNumber, 10) : null;
                if (customer && letterNumber) {
                    const today = new Date().toISOString().split('T')[0];
                    customer.letterStatus[letterNumber] = today;
                    customer.lastContacted = today;
                    if (customer.status === 'New') {
                        customer.status = 'Contacted';
                    }
                }
            }
            break;
        case 'delete':
            if (customerId) {
                if (inlineEditingCustomerId === customerId) inlineEditingCustomerId = null;
                const customer = customers.find(c => c.id === customerId);
                if (customer && window.confirm(`Are you sure you want to delete ${customer.name}? This cannot be undone.`)) {
                    customers = customers.filter(c => c.id !== customerId);
                    if (gsepProjects[customer.mainId]) {
                        delete gsepProjects[customer.mainId];
                    }
                }
            }
            break;
        case 'expand':
            if (customerId) {
                if (inlineEditingCustomerId === customerId) inlineEditingCustomerId = null;
                if (editingCommentsForCustomerId === customerId) editingCommentsForCustomerId = null;
                expandedCustomers.has(customerId) ? expandedCustomers.delete(customerId) : expandedCustomers.add(customerId);
            }
            break;
        case 'expand-gsep':
            const projectKey = actionTarget.dataset.projectKey;
            if (projectKey) {
                expandedGsepProjects.has(projectKey) ? expandedGsepProjects.delete(projectKey) : expandedGsepProjects.add(projectKey);
            }
            break;
        case 'start-inline-edit':
             if (customerId) {
                inlineEditingCustomerId = customerId;
                editingCommentsForCustomerId = null;
            }
            break;
        case 'cancel-inline-edit':
            inlineEditingCustomerId = null;
            break;
        case 'start-comments-edit':
            if (customerId) {
                editingCommentsForCustomerId = customerId;
            }
            break;
        case 'cancel-comments-edit':
            editingCommentsForCustomerId = null;
            break;
         case 'add-appliance':
            if (customerId) {
                const customer = customers.find(c => c.id === customerId);
                if (customer) {
                    customer.appliances.push({ id: Date.now(), name: '', btuPerHour: 0 });
                }
            }
            break;
        case 'remove-appliance':
            if (customerId) {
                const customer = customers.find(c => c.id === customerId);
                const applianceId = actionTarget.dataset.applianceId ? parseInt(actionTarget.dataset.applianceId, 10) : null;
                if (customer && applianceId) {
                    customer.appliances = customer.appliances.filter(a => a.id !== applianceId);
                }
            }
            break;
        case 'cancel-report-builder':
            activeView = 'dashboard';
            break;
    }
    renderApp();
}

function handleNavClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const tab = target.closest<HTMLElement>('.tab');
    const street = target.closest<HTMLElement>('li[data-street]');

    if (tab) {
        const town = tab.dataset.town as 'Fitchburg' | 'Gardner';
        if (town !== activeTown) {
            activeTown = town;
            selectedStreet = null; 
            renderApp();
        }
    } else if (street) {
        const streetName = street.dataset.street as string;
        selectedStreet = streetName === 'All Streets' ? null : streetName;
        renderApp();
    }
}

function closeModal() {
  activeModal = null;
  editingCustomer = null;
  newCustomerForModal = null;
  renderApp();
}

function handleModalEvents(event: Event) {
    const target = event.target as HTMLElement;
    const modalContainer = document.getElementById('modal-container');
    if (!modalContainer) return;
    
    if (event.type === 'click') {
        const actionTarget = target.closest<HTMLElement>('[data-action]');
        if (target.dataset.action === 'close-modal' || target.classList.contains('modal-overlay')) {
            closeModal();
            return;
        }

        if (actionTarget) {
            const action = actionTarget.dataset.action;
            const customerId = actionTarget.dataset.customerId ? actionTarget.dataset.customerId : null;
            
            switch (action) {
                case 'mark-ack-sent':
                    if (customerId) {
                        const customer = customers.find(c => c.id === parseInt(customerId, 10));
                        if (customer) {
                            customer.acknowledgmentStatus = 'Sent';
                        }
                    }
                    closeModal();
                    return;
                 case 'add-appliance-modal':
                    if (newCustomerForModal) {
                        newCustomerForModal.appliances.push({ id: Date.now(), name: '', btuPerHour: 0 });
                        renderModals(modalContainer);
                    }
                    break;
                case 'remove-appliance-modal':
                    if (newCustomerForModal) {
                        const applianceId = actionTarget.dataset.applianceId ? parseInt(actionTarget.dataset.applianceId, 10) : null;
                        if (applianceId) {
                           newCustomerForModal.appliances = newCustomerForModal.appliances.filter(a => a.id !== applianceId);
                           renderModals(modalContainer);
                        }
                    }
                    break;
            }
        }
    } 
    
    if (event.type === 'submit') {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        if (form.id === 'add-edit-form') handleAddSubmit(form);
        if (form.id === 'log-interaction-form') handleLogSubmit(form);
    }
}

function handleAddSubmit(form: HTMLFormElement) {
    const data = Object.fromEntries(new FormData(form).entries());
    const mainId = data.mainId as string;
    const gsepProjectNumber = data.gsepProjectNumber as string;
    const gsepProjectYear = data.gsepProjectYear ? parseInt(data.gsepProjectYear as string, 10) : null;
    
    if (mainId && gsepProjectNumber && gsepProjectYear) {
        gsepProjects[mainId] = { projectNumber: gsepProjectNumber, year: gsepProjectYear };
    }
    
    const town = data.town as 'Fitchburg' | 'Gardner';
    const sameAsAddress = (form.querySelector('[name="sameAsAddress"]') as HTMLInputElement)?.checked;
    const address = data.address as string;
    const mailingAddressValue = data.mailingAddress as string;
    const mailingAddress = sameAsAddress ? address : mailingAddressValue;

    const appliances: Appliance[] = [];
    const applianceRows = form.querySelectorAll('.appliance-form-row');
    applianceRows.forEach(row => {
        const id = parseInt((row as HTMLElement).dataset.applianceId || '0', 10);
        const nameInput = row.querySelector('input[name="applianceName"]') as HTMLInputElement;
        const btuInput = row.querySelector('input[name="applianceBtu"]') as HTMLInputElement;
        if (nameInput && btuInput && nameInput.value) { // Only add if name is not empty
            appliances.push({
                id: id,
                name: nameInput.value,
                btuPerHour: parseInt(btuInput.value, 10) || 0,
            });
        }
    });

    const customerData: Omit<Customer, 'id' | 'lastContacted' | 'interactions' | 'letterStatus'> = {
        name: data.name as string,
        email: data.email as string,
        phoneHome: data.phoneHome as string,
        phoneCell: data.phoneCell as string,
        phoneWork: data.phoneWork as string,
        mainId: mainId,
        serviceId: data.serviceId as string,
        meterNumber: data.meterNumber as string,
        address: address,
        mailingAddress: mailingAddress,
        town: town,
        customerType: data.customerType as CustomerType,
        contactRole: data.contactRole as Customer['contactRole'],
        language: data.language as Language,
        status: data.status as Customer['status'],
        acknowledgmentStatus: data.acknowledgmentStatus as Customer['acknowledgmentStatus'],
        isLMI: (form.querySelector('[name="isLMI"]') as HTMLInputElement).checked,
        hasParticipatedInEfficiencyProgram: (form.querySelector('[name="hasParticipated"]') as HTMLInputElement).checked,
        isInEJCommunity: (form.querySelector('[name="isInEJCommunity"]') as HTMLInputElement).checked,
        estimatedUpfrontCost: parseInt(data.estimatedUpfrontCost as string, 10) || 0,
        appliedIncentives: parseInt(data.appliedIncentives as string, 10) || 0,
        annualHeatLoadTherms: parseInt(data.annualHeatLoadTherms as string, 10) || 0,
        annualBaseLoadTherms: parseInt(data.annualBaseLoadTherms as string, 10) || 0,
        annualElectricalUsageKWH: parseInt(data.annualElectricalUsageKWH as string, 10) || 0,
        rateClassCode: data.rateClassCode as typeof rateClassCodes[number],
        electricProvider: town === 'Fitchburg' ? 'Unitil' : 'National Grid',
        appliances: appliances,
        comments: data.comments as string,
    };
    
    customers.push({
        id: Math.max(0, ...customers.map(c => c.id)) + 1,
        ...customerData,
        lastContacted: 'N/A',
        interactions: [],
        letterStatus: {}
    });
    
    closeModal();
}

function handleEditSubmit(form: HTMLFormElement, customerId: number) {
    const data = Object.fromEntries(new FormData(form).entries());
    const customer = customers.find(c => c.id === customerId);
    if (!customer) return;

    const mainId = data.mainId as string;
    const gsepProjectNumber = data.gsepProjectNumber as string;
    const gsepProjectYear = data.gsepProjectYear ? parseInt(data.gsepProjectYear as string, 10) : null;
    
    if (mainId && gsepProjectNumber && gsepProjectYear) {
        gsepProjects[mainId] = { projectNumber: gsepProjectNumber, year: gsepProjectYear };
    } else if (mainId) {
        // If details are cleared, remove the project entry
        delete gsepProjects[mainId];
    }
    
    const town = data.town as 'Fitchburg' | 'Gardner';
    const sameAsAddress = (form.querySelector('[name="sameAsAddress"]') as HTMLInputElement)?.checked;
    const address = data.address as string;
    const mailingAddressValue = data.mailingAddress as string;
    const mailingAddress = sameAsAddress ? address : mailingAddressValue;

    const updatedAppliances: Appliance[] = [];
    const applianceRows = form.querySelectorAll('.appliance-form-row');
    applianceRows.forEach(row => {
        const id = parseInt((row as HTMLElement).dataset.applianceId || '0', 10);
        const nameInput = row.querySelector('input[name="applianceName"]') as HTMLInputElement;
        const btuInput = row.querySelector('input[name="applianceBtu"]') as HTMLInputElement;
        if (nameInput && btuInput && nameInput.value) { // Only save if name is not empty
            updatedAppliances.push({
                id: id,
                name: nameInput.value,
                btuPerHour: parseInt(btuInput.value, 10) || 0,
            });
        }
    });

    const customerData: Omit<Customer, 'id' | 'lastContacted' | 'interactions' | 'letterStatus'> = {
        name: data.name as string,
        email: data.email as string,
        phoneHome: data.phoneHome as string,
        phoneCell: data.phoneCell as string,
        phoneWork: data.phoneWork as string,
        mainId: mainId,
        serviceId: data.serviceId as string,
        meterNumber: data.meterNumber as string,
        address: address,
        mailingAddress: mailingAddress,
        town: town,
        customerType: data.customerType as CustomerType,
        contactRole: data.contactRole as Customer['contactRole'],
        language: data.language as Language,
        status: data.status as Customer['status'],
        acknowledgmentStatus: data.acknowledgmentStatus as Customer['acknowledgmentStatus'],
        isLMI: (form.querySelector('[name="isLMI"]') as HTMLInputElement).checked,
        hasParticipatedInEfficiencyProgram: (form.querySelector('[name="hasParticipated"]') as HTMLInputElement).checked,
        isInEJCommunity: (form.querySelector('[name="isInEJCommunity"]') as HTMLInputElement).checked,
        estimatedUpfrontCost: parseInt(data.estimatedUpfrontCost as string, 10) || 0,
        appliedIncentives: parseInt(data.appliedIncentives as string, 10) || 0,
        annualHeatLoadTherms: parseInt(data.annualHeatLoadTherms as string, 10) || 0,
        annualBaseLoadTherms: parseInt(data.annualBaseLoadTherms as string, 10) || 0,
        annualElectricalUsageKWH: parseInt(data.annualElectricalUsageKWH as string, 10) || 0,
        rateClassCode: data.rateClassCode as typeof rateClassCodes[number],
        electricProvider: town === 'Fitchburg' ? 'Unitil' : 'National Grid',
        appliances: updatedAppliances,
        comments: data.comments as string,
    };

    const index = customers.findIndex(c => c.id === customerId);
    if (index !== -1) {
        // If mainId changed, we need to handle the gsepProjects key change
        const oldMainId = customers[index].mainId;
        if (oldMainId !== mainId && gsepProjects[oldMainId]) {
            gsepProjects[mainId] = gsepProjects[oldMainId];
            delete gsepProjects[oldMainId];
        }
        customers[index] = { ...customers[index], ...customerData };
    }
    
    inlineEditingCustomerId = null;
    renderApp();
}

function handleLogSubmit(form: HTMLFormElement) {
    if (!editingCustomer) return;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const date = data.interactionDate as string;
    
    const newInteraction: Interaction = {
        id: Math.max(0, ...editingCustomer.interactions.map(i => i.id)) + 1,
        type: data.interactionType as Interaction['type'],
        notes: data.notes as string,
        date,
        topics: formData.getAll('topics') as Interaction['topics']
    };

    const customerIndex = customers.findIndex(c => c.id === editingCustomer!.id);
    if (customerIndex !== -1) {
        customers[customerIndex].interactions.push(newInteraction);
        customers[customerIndex].status = 'Contacted';
        customers[customerIndex].lastContacted = date;
    }
    closeModal();
}

function handleFormSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    if (form.id === 'inline-edit-form') {
        const customerId = form.dataset.customerId ? parseInt(form.dataset.customerId, 10) : null;
        if (customerId) {
            handleEditSubmit(form, customerId);
        }
    } else if (form.dataset.action === 'save-comments') {
        const customerId = form.dataset.customerId ? parseInt(form.dataset.customerId, 10) : null;
        if (customerId) {
            const customer = customers.find(c => c.id === customerId);
            const textarea = form.querySelector('textarea[name="comments"]') as HTMLTextAreaElement;
            if (customer && textarea) {
                customer.comments = textarea.value;
                editingCommentsForCustomerId = null;
                renderApp();
            }
        }
    } else if (form.id === 'report-builder-form') {
        const formData = new FormData(form);
        const town = formData.get('town') as 'All' | 'Fitchburg' | 'Gardner';
        const selectedStatuses = formData.getAll('status') as Customer['status'][];
        const selectedCustomerTypes = formData.getAll('customerType') as CustomerType[];

        let filteredCustomers = [...customers];

        if (town && town !== 'All') {
            filteredCustomers = filteredCustomers.filter(c => c.town === town);
        }

        if (selectedStatuses.length > 0) {
            filteredCustomers = filteredCustomers.filter(c => selectedStatuses.includes(c.status));
        }

        if (selectedCustomerTypes.length > 0) {
            filteredCustomers = filteredCustomers.filter(c => selectedCustomerTypes.includes(c.customerType));
        }

        if (filteredCustomers.length === 0) {
            alert('No customers match the selected criteria.');
            return;
        }

        handleGenerateFullReport(filteredCustomers);
        activeView = 'dashboard';
        renderApp();
    }
}

function handleGenerateFullReport(customersToReport: Customer[] = customers) {
    const reportDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const reportStyles = `
        @page {
            size: letter;
            margin: 1in;
        }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.5; 
            color: #333;
        }
        .report-header {
            text-align: center;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid #000;
        }
        .report-header h1 {
            margin: 0;
            font-size: 24pt;
        }
        .report-header p {
            margin: 0;
            font-size: 12pt;
            color: #555;
        }
        .customer-section {
            margin-bottom: 2rem;
            padding: 1.5rem;
            border: 1px solid #ccc;
            border-radius: 8px;
            page-break-inside: avoid;
        }
        .customer-section h2 {
            margin-top: 0;
            margin-bottom: 1.5rem;
            padding-bottom: 0.75rem;
            border-bottom: 1px solid #ddd;
            font-size: 16pt;
            color: #1a73e8; /* primary-color */
        }
        .details-grid-report {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem 1.5rem;
            margin-bottom: 1.5rem;
        }
        .detail-item-report {
            font-size: 10pt;
        }
        .detail-item-report strong {
            display: block;
            color: #5f6368; /* text-color-light */
            font-weight: 600;
            margin-bottom: 2px;
            font-size: 9pt;
        }
        .sub-heading {
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
            font-size: 12pt;
            font-weight: 600;
            color: #1a73e8;
        }
        .interaction-list, .comments-section {
            font-size: 10pt;
            padding-left: 20px;
        }
        .interaction-list li {
            margin-bottom: 0.5rem;
        }
        .comments-section p {
            white-space: pre-wrap;
            background-color: #f8f9fa;
            padding: 0.75rem;
            border-radius: 4px;
            border: 1px solid #eee;
        }
        .no-data {
            font-style: italic;
            color: #777;
        }
        .topic-tag-report {
            display: inline-block;
            background-color: #e8f0fe;
            color: #185abc;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 8pt;
            font-weight: 500;
            margin-right: 4px;
        }
    `;

    let reportHtml = `
        <div class="report-header">
            <h1>Comprehensive Customer Status Report</h1>
            <p>Generated on ${reportDate}</p>
        </div>
    `;
    
    for (const customer of customersToReport) {
        const gsepProject = gsepProjects[customer.mainId];
        const gsepDisplay = gsepProject ? `${gsepProject.projectNumber} (${gsepProject.year})` : 'N/A';
        const flagItems = [
            { label: 'LMI', value: customer.isLMI },
            { label: 'EJ Community', value: customer.isInEJCommunity },
            { label: 'Prior Program', value: customer.hasParticipatedInEfficiencyProgram }
        ].filter(item => item.value).map(item => item.label).join(', ') || 'None';

        reportHtml += `
            <div class="customer-section">
                <h2>${customer.name} <span style="font-weight:400; color: #555; font-size: 12pt;">- Status: ${customer.status}</span></h2>

                <div class="details-grid-report">
                    <div class="detail-item-report"><strong>Main ID</strong> ${customer.mainId}</div>
                    <div class="detail-item-report"><strong>Service ID</strong> ${customer.serviceId}</div>
                    <div class="detail-item-report"><strong>Meter Number</strong> ${customer.meterNumber}</div>
                    
                    <div class="detail-item-report"><strong>Email</strong> ${customer.email}</div>
                    <div class="detail-item-report"><strong>Phone</strong> 
                        ${customer.phoneHome ? `H: ${customer.phoneHome}` : ''} 
                        ${customer.phoneCell ? `C: ${customer.phoneCell}` : ''} 
                        ${customer.phoneWork ? `W: ${customer.phoneWork}` : ''}
                        ${!customer.phoneHome && !customer.phoneCell && !customer.phoneWork ? 'N/A' : ''}
                    </div>
                    <div class="detail-item-report"><strong>Language</strong> ${customer.language}</div>
                    
                    <div class="detail-item-report"><strong>Service Address</strong> ${customer.address}, ${customer.town}</div>
                    <div class="detail-item-report"><strong>Mailing Address</strong> ${customer.mailingAddress}</div>
                    <div class="detail-item-report"><strong>Customer Type</strong> ${customer.customerType} (${customer.contactRole})</div>

                    <div class="detail-item-report"><strong>GSEP Project</strong> ${gsepDisplay}</div>
                    <div class="detail-item-report"><strong>Acknowledgment</strong> ${customer.acknowledgmentStatus}</div>
                    <div class="detail-item-report"><strong>Profile Flags</strong> ${flagItems}</div>

                    <div class="detail-item-report"><strong>Est. Upfront Cost</strong> ${formatCurrency(customer.estimatedUpfrontCost)}</div>
                    <div class="detail-item-report"><strong>Applied Incentives</strong> ${formatCurrency(customer.appliedIncentives)}</div>
                    <div class="detail-item-report"><strong>Net Cost</strong> ${formatCurrency(customer.estimatedUpfrontCost - customer.appliedIncentives)}</div>
                </div>
                
                <h3 class="sub-heading">Interaction History</h3>
                ${customer.interactions.length > 0 ? `
                    <ul class="interaction-list">
                        ${customer.interactions.slice().reverse().map(i => `
                            <li>
                                <strong>${i.date} (${i.type}):</strong> ${i.notes}
                                ${i.topics && i.topics.length > 0 ? `<div>${i.topics.map(t => `<span class="topic-tag-report">${t}</span>`).join('')}</div>` : ''}
                            </li>
                        `).join('')}
                    </ul>
                ` : '<p class="no-data" style="padding-left: 20px;">No interactions logged.</p>'}
                
                <h3 class="sub-heading">Comments</h3>
                <div class="comments-section">
                    ${customer.comments ? `<p>${customer.comments}</p>` : '<p class="no-data">No comments.</p>'}
                </div>
            </div>
        `;
    }

    const printWindow = window.open('', '_blank');
    if (printWindow) {
        printWindow.document.write(`
            <html>
                <head>
                    <title>Customer Status Report - ${reportDate}</title>
                    <style>${reportStyles}</style>
                </head>
                <body>${reportHtml}</body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
    } else {
        alert("Could not open a new window. Please disable your pop-up blocker.");
    }
}

function handleDownloadReport() {
    const currentTownCustomers = customers.filter(c => c.town === activeTown);
    const filteredCustomers = selectedStreet && selectedStreet !== 'All Streets'
        ? currentTownCustomers.filter(c => getStreet(c.address) === selectedStreet)
        : currentTownCustomers;

    if (filteredCustomers.length === 0) {
        alert('No customers to export in the current view.');
        return;
    }

    const headers = [
        'ID', 'Name', 'Email', 'Phone (Home)', 'Phone (Cell)', 'Phone (Work)', 
        'Service Address', 'Mailing Address', 'Town', 'Status', 'Last Contacted',
        'Customer Type', 'Contact Role', 'Language', 'Acknowledgment Status',
        'Main ID', 'GSEP Project Number', 'GSEP Project Year', 'Service ID', 'Meter Number', 'Electric Provider', 'Rate Class Code',
        'LMI', 'EJ Community', 'Prior Efficiency Program',
        'Estimated Upfront Cost', 'Applied Incentives',
        'Annual Heat Load (Therms)', 'Annual Base Load (Therms)', 'Annual Electrical Usage (kWh)',
        'Comments', 'Interaction History', 'Topics Discussed'
    ];

    const csvRows = [headers.join(',')];

    for (const customer of filteredCustomers) {
        const gsepProject = gsepProjects[customer.mainId];
        const gsepNumber = gsepProject ? gsepProject.projectNumber : '';
        const gsepYear = gsepProject ? gsepProject.year : '';
        const interactionsSummary = customer.interactions
            .map(i => `"${i.date} (${i.type}): ${i.notes.replace(/"/g, '""')}"`)
            .join('; ');
        const topicsSummary = customer.interactions
            .flatMap(i => i.topics || [])
            .filter((value, index, self) => self.indexOf(value) === index) // Unique topics
            .join('; ');

        const values = [
            customer.id, customer.name, customer.email, customer.phoneHome, customer.phoneCell, customer.phoneWork,
            `"${customer.address}"`, `"${customer.mailingAddress}"`, customer.town, customer.status, customer.lastContacted,
            customer.customerType, customer.contactRole, customer.language, customer.acknowledgmentStatus,
            customer.mainId, gsepNumber, gsepYear, customer.serviceId, customer.meterNumber, customer.electricProvider, customer.rateClassCode,
            customer.isLMI, customer.isInEJCommunity, customer.hasParticipatedInEfficiencyProgram,
            customer.estimatedUpfrontCost, customer.appliedIncentives,
            customer.annualHeatLoadTherms, customer.annualBaseLoadTherms, customer.annualElectricalUsageKWH,
            `"${customer.comments.replace(/"/g, '""')}"`,
            `"${interactionsSummary}"`,
            `"${topicsSummary}"`
        ];
        csvRows.push(values.join(','));
    }

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    const date = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `${activeTown}_Customers_Report_${date}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function handleExportData() {
    const fileName = "gsep-program-data.json";

    const dataToSave = {
        customers,
        gsepProjects,
    };

    const jsonString = JSON.stringify(dataToSave, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    
    setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, 100);
}

function handleImportData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';

    input.onchange = e => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const text = event.target?.result as string;
                const data = JSON.parse(text);

                if (data && Array.isArray(data.customers) && typeof data.gsepProjects === 'object') {
                    customers = data.customers;
                    Object.keys(gsepProjects).forEach(key => delete gsepProjects[key]);
                    Object.assign(gsepProjects, data.gsepProjects);
                    alert(`Successfully imported data for ${data.customers.length} customers.`);
                    renderApp();
                } else {
                    alert('Invalid JSON file format. Expected an object with "customers" and "gsepProjects" properties.');
                }
            } catch (error) {
                console.error('Error parsing JSON file:', error);
                alert('Failed to read or parse the JSON file.');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}


// Initial Render and Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
  const appContainer = document.getElementById('app');
  const modalContainer = document.getElementById('modal-container');
  
  if (appContainer) {
    appContainer.addEventListener('click', (e) => {
        handleAppClick(e as MouseEvent);
        if (activeView === 'customers') {
          handleNavClick(e as MouseEvent);
        }
    });
    appContainer.addEventListener('submit', handleFormSubmit);
  }
  
  if (modalContainer) {
    modalContainer.addEventListener('click', handleModalEvents);
    modalContainer.addEventListener('submit', handleModalEvents);
  }

  document.body.addEventListener('input', (event) => {
    const target = event.target as HTMLInputElement;
    if (target.classList.contains('btu-input')) {
        const form = target.closest('form');
        if (form) {
            handleBtuCalculation(form);
        }
    }
  });
});