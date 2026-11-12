import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Product } from '@/data/siteData';

export type OrderItem = {
  id: string;
  name: string;
  size: string;
  price: string;
  kannadaName?: string;
  art?: 'bottle' | 'pouch';
  image?: string;
  isCombo?: boolean;
};

interface OrderModalContextType {
  isOpen: boolean;
  orderItem: OrderItem | null;
  initialQuantity: number;
  openOrderModal: (item: OrderItem | Product, quantity?: number) => void;
  closeOrderModal: () => void;
}

const OrderModalContext = createContext<OrderModalContextType | undefined>(undefined);

export function OrderModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [orderItem, setOrderItem] = useState<OrderItem | null>(null);
  const [initialQuantity, setInitialQuantity] = useState(1);

  const openOrderModal = (item: OrderItem | Product, quantity = 1) => {
    setOrderItem(item);
    setInitialQuantity(Math.max(1, quantity));
    setIsOpen(true);
  };

  const closeOrderModal = () => {
    setIsOpen(false);
  };

  return (
    <OrderModalContext.Provider
      value={{
        isOpen,
        orderItem,
        initialQuantity,
        openOrderModal,
        closeOrderModal,
      }}
    >
      {children}
    </OrderModalContext.Provider>
  );
}

export function useOrderModal() {
  const context = useContext(OrderModalContext);
  if (!context) {
    throw new Error('useOrderModal must be used within an OrderModalProvider');
  }
  return context;
}

