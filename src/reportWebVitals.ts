// src/reportWebVitals.ts
import { ReportHandler } from 'web-vitals';

// ✅ FIX: 라이브러리 업데이트에 맞춰 onCLS, onFCP 등을 getCLS, getFCP 등으로 변경
const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;