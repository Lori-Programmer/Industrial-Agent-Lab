import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { products } from "@/lib/site-data";

export const metadata = {
  title: "产品/服务"
};

export default function ServicesPage() {
  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">Products & Services</p>
        <h1>产品 / 服务</h1>
        <p>公开内容导流到 Bilibili 和 GitHub，深度需求通过私域承接。</p>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Offer"
          title="当前与未来可以提供的产品"
          description="第一版不做支付，不做登录；网站不提供站内文件，按钮只指向账号或联系方式。"
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.title} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
