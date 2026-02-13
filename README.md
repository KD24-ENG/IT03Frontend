# IT03 Frontend (Angular + Material)

Frontend application for IT 03 approval workflow.

Implements:
- IT 03-1 document list
- IT 03-2 approve dialog
- IT 03-3 reject dialog
- Angular Material UI
- Backend pagination integration
- Snackbar notifications

---

## Tech Stack

- Angular 17+
- Angular Material
- TypeScript
- RxJS

---

## Features

- Material table
- Status chips (Pending / Approved / Rejected)
- Disable approve/reject if not pending
- Dialog modal with required reason
- Backend API integration
- Pagination support

---

## Project Structure

```
src/app
 ├── core
 │    ├── models
 │    └── services
 ├── features
 │    └── it03
```

---

## How to Run

### 1. Clone repository

```
git clone https://github.com/KD24-ENG/IT03Frontend.git
cd IT03Frontend
```

### 2. Install dependencies

```
npm install
```

### 3. Run application

```
ng serve
```

Open browser:

```
http://localhost:4200
```

---

## Environment Configuration

Update API URL inside:

```
core/services/it03.service.ts
```

Example:

```
http://localhost:5001/api/it03
```

---

## Notes

Make sure backend is running before starting frontend.