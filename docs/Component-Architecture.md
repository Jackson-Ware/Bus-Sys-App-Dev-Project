# Component Architecture - Product Catalog

## Atomic Design Hierarchy

### **1. Atoms**
**Definition:** The smallest building blocks of your interface.

**Examples:**
- Button
- Input
- Label
- Icon
- Image
- Text
- Badge

---

### **2. Molecules**
**Definition:** Groups of atoms bonded together to form a functional unit.

**Examples:**
- **SearchBar** (combines Input atom and Button atom)
- **PriceDisplay** (Text atom + Badge atom)
- **RatingStars** (Icon atom x5 + Text atom)
- **FilterCheckbox** (Checkbox atom + Label atom)

---

### **3. Organisms**
**Definition:** Complex components composed of groups of molecules and/or atoms that form a distinct section of an interface.

**Examples:**

**ProductCard**
- Image (atom)
- Text (atom) - title
- PriceDisplay (molecule)
- RatingStars (molecule)
- Button (atom) - "Add to Cart"

**FilterPanel**
- Text (atom) - heading
- FilterCheckbox (molecule) x N
- Button (atom) - "Apply"
- Button (atom) - "Clear"

**ProductGrid**
- ProductCard (organism) x N

**SearchAndSort**
- SearchBar (molecule)
- Label (atom) - "Sort by:"
- Dropdown (atom)

---

### **4. Templates**
**Definition:** Page-level layouts that place components into a context.

**Examples:**

**ProductCatalogTemplate**
- SearchAndSort (organism) - top section
- FilterPanel (organism) - left sidebar
- ProductGrid (organism) - main content area
- Pagination (organism) - bottom section

---

## Visual Component Hierarchy
```
ProductCatalogTemplate (Template)
│
├─── SearchAndSort (Organism)
│    ├─── SearchBar (Molecule)
│    │    ├─── Input (Atom)
│    │    └─── Button (Atom)
│    ├─── Label (Atom)
│    └─── Dropdown (Atom)
│
├─── FilterPanel (Organism)
│    ├─── Text (Atom)
│    ├─── FilterCheckbox (Molecule) x N
│    │    ├─── Checkbox (Atom)
│    │    └─── Label (Atom)
│    ├─── Button (Atom)
│    └─── Button (Atom)
│
├─── ProductGrid (Organism)
│    └─── ProductCard (Organism) x N
│         ├─── Image (Atom)
│         ├─── Text (Atom)
│         ├─── PriceDisplay (Molecule)
│         │    ├─── Text (Atom)
│         │    └─── Badge (Atom)
│         ├─── RatingStars (Molecule)
│         │    ├─── Icon (Atom) x5
│         │    └─── Text (Atom)
│         └─── Button (Atom)
│
└─── Pagination (Organism)
     └─── Button (Atom) x N
```

---

## Component Reusability

- **Button (Atom)**: Used in ProductCard, FilterPanel, Pagination, SearchBar
- **ProductCard (Organism)**: Used in ProductGrid, Search Results page, Shopping Cart page
- **SearchBar (Molecule)**: Used in Product Catalog, Order History, Faculty Adoption Portal
- **FilterCheckbox (Molecule)**: Used in FilterPanel, Advanced Search, Settings page

---

**Last Updated:** February 15, 2026  
**Course:** ACCTMIS 4630 - Business Systems Development  
**Project:** OSU Campus Store eCommerce Platform  
**Feature Scope:** Product Catalog
