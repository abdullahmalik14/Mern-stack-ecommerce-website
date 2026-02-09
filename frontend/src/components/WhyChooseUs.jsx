import { Truck, ShieldCheck, RefreshCw, Headphones } from "lucide-react";

const features = [
  {
    icon: <Truck size={40} className="text-gray-900" />,
    title: "Free Shipping",
    description: "On all orders over $100"
  },
  {
    icon: <ShieldCheck size={40} className="text-gray-900" />,
    title: "Secure Payment",
    description: "100% secure payment methods"
  },
  {
    icon: <RefreshCw size={40} className="text-gray-900" />,
    title: "Easy Returns",
    description: "30-day return policy"
  },
  {
    icon: <Headphones size={40} className="text-gray-900" />,
    title: "24/7 Support",
    description: "Dedicated support team"
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4 p-3 bg-gray-100 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
