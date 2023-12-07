<script lang="ts">
    import seoLogo from '$lib/assets/importance-of-seo.png'
    import typographyLogo from '$lib/assets/role-of-typography.png'
    import securityLogo from '$lib/assets/security-measures.png'
</script>

<section class="bg-white dark:bg-gray-900 mt-20 mb-40">
    <div class="container px-6 py-10 mx-auto">
        <div class="flex items-center justify-between">
            <h1 class="text-3xl font-semibold text-gray-800 capitalize sm:text-5xl dark:text-white">Recent Posts</h1>

            <!---
            <button class="focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-600 transition-colors duration-300 transform dark:text-gray-400 hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>
            --->
        </div>

        <hr class="my-8 border-gray-200 dark:border-gray-700">

        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            <div>
                <img class="object-cover object-center w-full h-64 rounded-lg lg:h-80" src={seoLogo} alt="The Importance of SEO">

                <div class="mt-8">

                    <h1 class="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
                        The Importance of SEO
                    </h1>

                    <p class="mt-2 text-gray-500 dark:text-gray-400">
                        The Importance of SEO: Enhancing Online Visibility and Driving Results. 
                        Learn why SEO is crucial for improving your website's visibility, 
                        attracting more visitors, and achieving better online performance.
                    </p>

                    <div class="flex items-center justify-between mt-4">
                        <div>
                            <p class="text-lg font-medium text-gray-700 dark:text-gray-300">
                                Tim Reed
                            </p>

                            <p class="text-sm text-gray-500 dark:text-gray-400">June 5, 2023</p>
                        </div>

                        <a href="/blog/the-importance-of-seo" class="inline-block text-blue-500 underline hover:text-blue-400">Read more</a>
                    </div>

                </div>
            </div>

            <div>
                <img class="object-cover object-center w-full h-64 rounded-lg lg:h-80" src={typographyLogo} alt="">

                <div class="mt-8">

                    <h1 class="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
                        The Role of Typography in Web Design
                    </h1>

                    <p class="mt-2 text-gray-500 dark:text-gray-400">
                        The Role of Typography in Web Design: Enhancing User Experience and Branding. 
                        Learn how typography impacts website design, readability, and brand perception, 
                        and discover its power in creating engaging and memorable online experiences.
                    </p>

                    <div class="flex items-center justify-between mt-4">
                        <div>
                            <p class="text-lg font-medium text-gray-700 dark:text-gray-300">
                                Tim Reed
                            </p>

                            <p class="text-sm text-gray-500 dark:text-gray-400">Feb 16, 2023</p>
                        </div>

                        <a href="/blog/the-role-of-typography-in-web-design" class="inline-block text-blue-500 underline hover:text-blue-400">Read more</a>
                    </div>

                </div>
            </div>

            <div>
                <img class="object-cover object-center w-full h-64 rounded-lg lg:h-80" src={securityLogo} alt="">

                <div class="mt-8">

                    <h1 class="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
                        Essential Security Measures for Web Development
                    </h1>

                    <p class="mt-2 text-gray-500 dark:text-gray-400">
                        Essential Web Development Security Measures: Protecting Your Online Presence. 
                        Discover key steps to secure your website from cyber threats, 
                        safeguarding user data and maintaining a strong online security posture.
                    </p>

                    <div class="flex items-center justify-between mt-4">
                        <div>
                            <p class="text-lg font-medium text-gray-700 dark:text-gray-300">
                                Tim Reed
                            </p>

                            <p class="text-sm text-gray-500 dark:text-gray-400">December 21, 2022</p>
                        </div>

                        <a href="/blog/essential-security-measures-for-web-development" class="inline-block text-blue-500 underline hover:text-blue-400">Read more</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>