import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProductsClient = dynamic(() => import('./ProductsClient'), { suspense: true });

export default function ProductsPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductsClient />
      </Suspense>
      <Footer />
    </>
  );
}
