import Newsletter from "../components/Newsletter";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <div className="inline-flex gap-2 items-center mb-3">
            <h1 className="font-bold uppercase text-gray-900 text-2xl">Contact <span className="text-gray-500 font-medium">Us</span></h1>
        </div>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 container mx-auto px-4">
        <img className="w-full md:max-w-[480px]" src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=2070&auto=format&fit=crop" alt="" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            54709 Willms Station <br /> Suite 350, Washington, USA
          </p>
          <p className="text-gray-500">
            Tel: (415) 555-0132 <br /> Email: admin@mensfashion.com
          </p>
          <p className="font-semibold text-xl text-gray-600">
            Careers at MensFashion
          </p>
          <p className="text-gray-500">
            Learn more about our teams and job openings.
          </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>

      <Newsletter />
    </div>
  );
};

export default Contact;
