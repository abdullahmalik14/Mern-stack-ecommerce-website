const Newsletter = () => {
  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4 uppercase">Join Our Newsletter</h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
          Subscribe to receive updates, access to exclusive deals, and more.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 justify-center">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="px-6 py-3 rounded-md bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-white w-full sm:w-96"
          />
          <button 
            type="submit" 
            className="px-8 py-3 bg-white text-black font-bold rounded-md hover:bg-gray-200 transition-colors uppercase tracking-wider"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
