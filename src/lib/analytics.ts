// Analytics & Event Tracking Utilities

declare global {
    interface Window {
        dataLayer: Record<string, unknown>[];
        gtag: (...args: unknown[]) => void;
    }
}

export function trackEvent(eventName: string, payload: Record<string, unknown> = {}) {
    if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
            event: eventName,
            ...payload,
        });
    }
}

export const EVENTS = {
    LEAD_SUBMIT: 'lead_submit',
    ROI_CALCULATED: 'roi_calculated',
    WHATSAPP_CLICK: 'whatsapp_click',
    SCROLL_75: 'scroll_75',
    CTA_CLICK: 'cta_click',
    FAQ_OPEN: 'faq_open',
} as const;
