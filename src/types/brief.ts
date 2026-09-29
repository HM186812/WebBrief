export type WebsiteType =
  | 'corporate'
  | 'ecommerce'
  | 'hospitality'
  | 'portfolio'
  | 'restaurant'
  | 'education'
  | 'real_estate'
  | 'custom_app';

export type DesignStyleId =
  | 'minimal_luxury'
  | 'corporate_tech'
  | 'ecommerce_modern'
  | 'hospitality_warm'
  | 'creative_bold'
  | 'traditional_artisan';

export type BriefStatus =
  | 'new'
  | 'reviewing'
  | 'proposal_sent'
  | 'approved'
  | 'in_development'
  | 'completed';

export type BudgetRange =
  | 'under_10m_lak'
  | '10m_25m_lak'
  | '25m_50m_lak'
  | '50m_100m_lak'
  | 'over_100m_lak'
  | 'flexible';

export type LaunchTimeline =
  | 'urgent_2_weeks'
  | '1_month'
  | '2_3_months'
  | 'flexible';

export interface ColorPalette {
  id: string;
  nameLo: string;
  nameEn: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

export interface FeatureRequirement {
  id: string;
  category: 'commerce' | 'interaction' | 'content' | 'localization' | 'technical' | 'integration';
  titleLo: string;
  titleEn: string;
  descriptionLo: string;
  descriptionEn: string;
  recommendedFor?: WebsiteType[];
  enabled: boolean;
}

export interface WebStandardItem {
  id: string;
  code: string;
  titleLo: string;
  titleEn: string;
  descriptionLo: string;
  descriptionEn: string;
  importance: 'critical' | 'high' | 'standard';
  checked: boolean;
}

export interface ClientBrief {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: BriefStatus;
  
  // 1. Business Info
  clientName: string;
  companyName: string;
  email: string;
  phone: string;
  whatsappOrLine: string;
  businessCategory: string;
  businessDescription: string;
  targetAudience: string;
  
  // 2. Website Scope & Pages
  websiteType: WebsiteType;
  customWebsiteType?: string;
  primaryGoal: string;
  selectedPages: string[];
  customPages: string;
  
  // 3. Design & Style
  designStyle: DesignStyleId;
  customDesignStyle?: string;
  colorPaletteId: string;
  customPrimaryColor?: string;
  customSecondaryColor?: string;
  visualMoodKeywords: string[];
  typographyPreference: 'modern_sans' | 'editorial_serif' | 'clean_minimal' | 'bold_impact';
  referenceUrls: string;
  
  // 4. Features & Functionality
  features: string[]; // FeatureRequirement IDs
  languages: string[]; // 'lo', 'en', 'th', 'zh'
  paymentMethods: string[]; // 'bcel_one', 'onepay_qr', 'credit_card', 'cash_on_delivery'
  
  // 5. Assets & Content Readiness
  logoStatus: 'ready' | 'needs_refresh' | 'needs_new_creation';
  copywritingStatus: 'ready' | 'partial' | 'needs_agency_writing';
  photographyStatus: 'ready_hd' | 'smartphone' | 'needs_photography_service';
  domainHostingStatus: 'already_have' | 'need_agency_recommendation' | 'need_assistance';
  domainNameDesired?: string;
  
  // 6. Budget & Timeline
  budgetRange: BudgetRange;
  timeline: LaunchTimeline;
  paymentTerms?: string;
  warrantyPeriod?: string;
  additionalNotes: string;
  
  // 7. Agency Evaluation (Calculated/Assessed)
  estimatedComplexity: 'Low' | 'Medium' | 'High' | 'Enterprise';
  estimatedTimelineWeeks: string;
  estimatedBudgetEstimateLo: string;
  estimatedBudgetEstimateEn: string;
  recommendedTechStack: {
    frontend: string;
    backend: string;
    database: string;
    hosting: string;
    payment: string;
  };
  standardsAudit: WebStandardItem[];
  agencyNotes?: string;
}
