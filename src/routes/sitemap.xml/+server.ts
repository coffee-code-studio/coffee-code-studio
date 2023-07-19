export async function GET() {
    return new Response(
        `
        <?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                <url>
                    <loc>https://www.coffeecodestudio.com/</loc>
                    <changefreq>daily</changefreq>
                    <priority>1.0</priority>
                </url>
                <url>
                    <loc>https://www.coffeecodestudio.com/about</loc>
                    <changefreq>weekly</changefreq>
                    <priority>0.8</priority>
                </url>
                <url>
                    <loc>https://www.coffeecodestudio.com/portfolio</loc>
                    <changefreq>weekly</changefreq>
                    <priority>0.7</priority>
                </url>
                <url>
                    <loc>https://www.coffeecodestudio.com/contact</loc>
                    <changefreq>monthly</changefreq>
                    <priority>0.6</priority>
                </url>
            </urlset>`.trim(),
        {
            headers: {
                'Content-Type': 'application/xml'
            }
        }
    )
}