import { c as create_ssr_component } from "../../chunks/index2.js";
const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="grid h-screen px-4 bg-white place-content-center dark:bg-gray-900"><div class="text-center"><h1 class="font-black text-gray-200 text-9xl dark:text-gray-700">404</h1>

    <p class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Uh-oh!
    </p>

    <p class="mt-4 text-gray-500 dark:text-gray-400">We can&#39;t find that page.
    </p>

    <a href="/" class="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring">Go Back Home
    </a></div></div>`;
});
export {
  Error as default
};
