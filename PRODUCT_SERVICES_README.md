# Product + Services Integration Guide

## Quick Start

The Barato D+ platform has been transformed from a products-only e-commerce into an integrated **Product + Services** ecosystem with 5 distinct revenue models.

### What's New?

1. **Service Mode Selector** — Users can switch between "Comprar" (Buy), "Alugar" (Rent), and "Manutenção" (Maintenance) modes
2. **Service Modules** — Reusable components for Installation, Maintenance, and Rental options on product pages
3. **Business Models** — 5 documented monetization strategies with revenue projections
4. **Slug Standardization** — Complete audit ensuring consistent product/category naming

---

## Files Overview

### 📄 Documentation
- **`IMPLEMENTATION_SUMMARY.md`** — Complete project overview, deliverables, and integration steps
- **`BUSINESS_PLANS.md`** — 5 revenue models with target audiences, pricing, and KPIs
- **`SLUG_AUDIT_REPORT.md`** — Slug standardization audit with findings and recommendations
- **`PRODUCT_SERVICES_README.md`** — This file

### 💾 Data Structures
- **`data/services.ts`** — Service types, data, and helper functions
  - Installation services (3 options)
  - Maintenance services (4 options)
  - Rental options (3 terms)
  - Helper functions: `getServicesByCategory()`, `getRentOptionsByProduct()`, etc.

- **`data/categories.ts`** — Already optimized (10 root + 4 subcategories)
- **`data/products.ts`** — Already optimized (70+ products with consistent slugs)

### 🎨 Components

#### Service Modules (Ready to integrate into PDP)
- **`components/services/InstallationModule.tsx`**
  - Shows installation options with pricing
  - Features list and regional availability
  - "Adicionar Instalação" toggle button
  - Expandable details view

- **`components/services/MaintenanceModule.tsx`**
  - Lists maintenance plans (Básico, Premium, Corretiva)
  - Service selection tracking
  - "Agendar Serviço" CTA
  - Features per plan

- **`components/services/RentalModule.tsx`**
  - Shows rental terms (Diário, Semanal, Mensal)
  - Pricing, deposits, min/max duration
  - Delivery & maintenance badges
  - "Agendar Aluguel" CTA

#### Existing Service Components
- **`components/services/ServiceModeSelector.tsx`** — Already created
  - 3-button mode switcher (Comprar, Alugar/Alocar, Manutenção)
  - Integrated in category page toolbar

### 📍 Pages Modified
- **`app/(shop)/c/[slug]/page.tsx`** — Category page
  - Added ServiceModeSelector to toolbar (line 150-154)
  - Filtering logic already supports parent categories
  - Shows all products from subcategories when viewing "Eletrodomésticos"

- **`app/(shop)/p/[slug]/page.tsx`** — Product detail page
  - Ready for integration of 3 service modules
  - Just import and add after warranty section

---

## 5 Business Models

| # | Model | Use Case | Revenue Type | Est. T1 |
|---|-------|----------|--------------|--------|
| **1** | **Instalação Fácil** | Appliance buyers | Commission on service (40%) | R$ 1.2k |
| **2** | **Proteção & Manutenção** | Premium customers | Monthly subscription | R$ 500 |
| **3** | **Aluguel Inteligente** | Occasional users, events | Rental revenue (40% margin) | R$ 500 |
| **4** | **Bundle Produto+Serviço** | Multi-item shoppers | Volume increase | R$ 1.5k |
| **5** | **Rede de Técnicos** | Technician partners | Marketplace commission (22.5%) | R$ 400 |

**Year 1 Projection:** ~R$ 380k additional revenue (single store)

See `BUSINESS_PLANS.md` for detailed breakdowns, timelines, and KPIs.

---

## Integration Checklist

### For Developers

#### ✅ Already Done
- [x] Slug standardization (95% complete, no breaking changes)
- [x] Service data models created (`data/services.ts`)
- [x] Service components built (Installation, Maintenance, Rental)
- [x] ServiceModeSelector integrated in category page
- [x] Category filtering logic verified

#### ⏳ TODO - Priority 1 (Next Developer)
- [ ] **Import service modules into PDP**
  ```tsx
  // app/(shop)/p/[slug]/page.tsx (around line 350)
  import { InstallationModule } from '@/components/services/InstallationModule'
  import { MaintenanceModule } from '@/components/services/MaintenanceModule'
  import { RentalModule } from '@/components/services/RentalModule'
  
  // Add in JSX after warranty section:
  <InstallationModule categorySlug={product.categorySlug} productName={product.name} onSelect={...} />
  <MaintenanceModule categorySlug={product.categorySlug} productName={product.name} onSelect={...} />
  <RentalModule productId={product.id} productName={product.name} onSelect={...} />
  ```

- [ ] **Extend cart store to track services**
  ```tsx
  // In lib/store/cartStore.ts, add to CartItem interface:
  selectedInstallation?: { serviceId: string; price: number }
  selectedMaintenance?: { serviceId: string; price: number }
  selectedRental?: RentOption
  ```

- [ ] **Connect service callbacks to cart**
  - When user selects Installation → add to cart total
  - When user selects Maintenance Plan → add recurring charge flag
  - When user selects Rental → switch to rental checkout flow

#### ⏳ TODO - Priority 2 (Phase 2)
- [ ] Create scheduling component (calendar + time slots)
- [ ] Build service booking flow
- [ ] Implement regional availability filtering
- [ ] Add service to checkout flow
- [ ] Create post-booking confirmation/tracking page

#### ⏳ TODO - Priority 3 (Phase 3+)
- [ ] Build technician marketplace
- [ ] Create subscription management dashboard
- [ ] Implement analytics & KPI tracking
- [ ] A/B test copy, pricing, positioning
- [ ] Regional expansion tool

---

## API Endpoints (When Implementing Backend)

### Services
```
GET /api/services?category=eletrodomesticos&type=installation
GET /api/services/:id
GET /api/services/products/:productId/rent-options
```

### Bookings
```
POST /api/bookings/schedule
GET /api/bookings/:bookingId
PATCH /api/bookings/:bookingId/cancel
```

### Subscriptions
```
POST /api/subscriptions
GET /api/subscriptions/:subscriptionId
PATCH /api/subscriptions/:subscriptionId/cancel
```

---

## Data Model

### Service
```typescript
interface Service {
  id: string                      // 'svc-install-standard'
  name: string                    // 'Instalação Profissional'
  slug: string                    // 'instalacao-profissional'
  description: string
  serviceType: 'install' | 'maintenance' | 'rent'
  applicableCategories: string[]  // ['eletrodomesticos', 'climatizacao']
  applicableProducts?: string[]   // Optional: specific products
  applicableBrands?: string[]     // Optional: specific brands
  pricingModel: 'fixed' | 'from' | 'per-hour' | 'tiered' | 'daily'
  basePrice: number              // R$ value
  additionalInfo?: string         // '/mês' for subscriptions
  schedulingEnabled: boolean
  regionsAvailable: string[]      // ['MG', 'SP', 'RJ']
  estimatedDays?: number | [number, number]
  features: string[]
}
```

### RentOption
```typescript
interface RentOption {
  id: string
  productId: string
  term: 'daily' | 'weekly' | 'monthly'
  pricePerTerm: number
  deposit: number
  maxDuration?: number
  minDuration?: number
  includesDelivery: boolean
  includesMaintenance: boolean
  availability: {
    available: boolean
    nextAvailableDate?: string
    regions: string[]
  }
}
```

---

## Helper Functions

### From `data/services.ts`

```typescript
// Get services for a category
getServicesByCategory(categorySlug: string, serviceType?: ServiceType): Service[]

// Get services for a specific product
getServicesByProduct(
  productId: string,
  productCategorySlug: string,
  serviceType?: ServiceType
): Service[]

// Get rental options for a product
getRentOptionsByProduct(productId: string): RentOption[]

// Check regional availability
isServiceAvailableInRegion(service: Service, region: string): boolean

// Format price display
formatServicePrice(service: Service): string
```

### From `lib/utils/categories.ts`

```typescript
// Get all subcategory slugs for a parent category
getSubcategorySlugs(parentCategorySlug: string): string[]

// Get parent category of a subcategory
getParentCategory(subcategorySlug: string): Category | undefined

// Check if category has subcategories
isParentCategory(slug: string): boolean
```

---

## Testing Checklist

### Manual Testing
- [ ] Visit category page, verify ServiceModeSelector appears
- [ ] Click each mode button (Comprar, Alugar, Manutenção), verify URL updates
- [ ] Visit product page, verify modules render correctly
- [ ] Click "Adicionar Instalação" button, verify state changes
- [ ] Expand maintenance plans, verify all options display
- [ ] Select rental term, verify pricing displays correctly
- [ ] Verify "Limpar Filtros" works on empty states

### Automated Testing (Optional)
- [ ] Test `getServicesByCategory()` returns correct services
- [ ] Test `getSubcategorySlugs()` returns parent + child categories
- [ ] Test service filtering by region
- [ ] Test rental term selection state management

---

## Current Limitations

1. **Scheduling Not Implemented** — Calendar/booking component needed
2. **Technician Marketplace** — Integration pending
3. **Regional Hardcoded** — Currently MG/SP/RJ only
4. **Payment Flow** — Service charges not in checkout yet
5. **Notifications** — No SMS/email confirmations
6. **Analytics** — No tracking implemented yet

See `IMPLEMENTATION_SUMMARY.md` for full list of known limitations and recommendations.

---

## Revenue KPIs

Track these metrics to measure success:

| Metric | Target (T1) | Calculation |
|--------|------------|-------------|
| Installation Attach Rate | 15% | (Orders with install / Total orders) × 100 |
| Maintenance Adoption | 8% | (Customers subscribing / Total customers) × 100 |
| Rental Bookings | 5/month | Total rental reservations |
| Bundle Penetration | 10% | (Bundle orders / Total orders) × 100 |
| Marketplace GMV | R$ 8k/month | Total value of technician bookings |

---

## Support & Questions

### I need to understand the service data structure
→ See `data/services.ts` and the Data Model section above

### I need to integrate services into the checkout
→ See `IMPLEMENTATION_SUMMARY.md` "Integration Steps" section

### I need to add a new service
→ Add to `installationServices`, `maintenanceServices`, or `rentOptions` array in `data/services.ts`

### I need to understand the business model
→ Read `BUSINESS_PLANS.md` for detailed revenue breakdown

### I found a slug inconsistency
→ Check `SLUG_AUDIT_REPORT.md` for known issues and resolution steps

---

## Architecture Diagram

```
Homepage / Category Page
    ↓
[ServiceModeSelector]
    ├→ Comprar (Buy)
    ├→ Alugar (Rent)  
    └→ Manutenção (Maintenance)
    ↓
Product Grid
    ↓
[ProductCard] + Service Badges
    ↓
Product Detail Page (PDP)
    ├→ [InstallationModule] → "Adicionar Instalação"
    ├→ [MaintenanceModule] → "Agendar Serviço"
    └→ [RentalModule] → "Agendar Aluguel"
    ↓
Cart (tracks selected services)
    ↓
Checkout (new checkout flow for services)
    ↓
Order Confirmation (links to booking/schedule)
    ↓
Service Fulfillment (technician, calendar, etc.)
```

---

## Next Steps

1. **This Week:** Import 3 service modules into PDP
2. **Next Week:** Extend cart store to track services
3. **Week 3:** Build scheduling component
4. **Week 4:** Connect to checkout flow
5. **Week 5:** Launch Installation as MVP
6. **Week 6+:** Expand to Maintenance and Rental

---

## Questions?

Refer to these documents in order:
1. `IMPLEMENTATION_SUMMARY.md` — Project overview & integration checklist
2. `BUSINESS_PLANS.md` — Revenue models & pricing
3. `SLUG_AUDIT_REPORT.md` — Data consistency & fixes
4. This file (`PRODUCT_SERVICES_README.md`) — Quick reference guide

Or reach out to the project team for clarification on specific components.
