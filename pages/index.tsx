import type { NextPage } from 'next'
import Link from 'next/link'
import Button from '../components/Button'

import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { postFilePaths, POSTS_PATH } from '../utils/mdxUtils'

function Home({ posts }) {
  return (
    <div>
      <main>
        <div className="h-screen flex flex-col justify-center space-y-5 ml-150px w-380px">
          <h1 className="text-title font-bold text-accent">AppImage Pool</h1>
          <p className="text-paragraph">A simple, modern AppImageHub client powered by flutter.</p>
          <div className="flex flex-row space-x-5">
            <Button isAccented={ true } text="Download" link="#download" />
            <Button isFlat={ true } text="Documentation" link="" />
          </div>
        </div>

        <div className="absolute right-0 bottom-0">
          {/* TODO: Resize the image responsively */}
          <img className="rounded-tl-md" src="/app.jpg" width="700" />
        </div>

        <div className="h-32"></div>

        <div id="blog" className="bg-secondary flex flex-col place-items-center">
          <div className="h-32"></div>
          <div>
            <h1 className="text-heading-1 text-accent font-bold">Latest News</h1>
            {/* TODO: Get the most recent post */}
            {posts.map((post) => (
              <div className="mt-16 flex flex-row space-x-120px">
                <div className="mr-60px hover:scale-105 ease-linear duration-200">
                  <img src={post.data.thumbnailUrl} width="480" className="rounded-md shadow-lg"></img>
                </div>
                <div className="flex flex-col w-380px space-y-4 justify-center">
                  <h2 className="text-heading-2 text-accent">{post.data.title}</h2>
                  <p className="text-paragraph">{post.data.description}</p>
                  <div className="flex flex-row space-x-5">
                    {/* TODO: Use POSTS_PATH here */}
                    <Button isAccented={ true } text="Read More" link={ "posts/" + post.filePath.replace(".mdx", "") } />
                    <Button isFlat={ true } text="View All" link="/blog" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="h-32"></div>
        </div>

        <div className="h-32"></div>

        {/* TODO: Get the feature pattern to show */}

        <div id="features" className="flex flex-col space-y-32">
          <h1 className="text-accent text-heading-1 font-bold place-self-center">Features</h1>
          <div className="flex flex-row place-items-center justify-center">
            <div className="w-380px ml-60 text-right space-y-5 mr-120px">
              <h2 className="text-heading-2 text-accent">Simple Categories</h2>
              <p className="text-paragraph">All apps are sorted into categories so you can search and find what your looking for quickly</p>
            </div>
            <div className="bg-contain bg-no-repeat bg-feature-pattern">
              <img className="hover:scale-105 ease-linear duration-200 rounded-md shadow-lg" width="400" src="/category.jpg" />
            </div>
          </div>
          <div className="flex flex-row place-items-center justify-center">
            <div className="bg-contain bg-no-repeat bg-feature-pattern-flipped">
              <img className="hover:scale-105 ease-linear duration-200 rounded-md shadow-lg" width="400" src="/app.jpg" />
            </div>
            <div className="w-380px mr-60 space-y-5 ml-120px">
              <h2 className="text-heading-2 text-accent">Upgrade and Downgrade AppImages Easily</h2>
              <p className="text-paragraph">Upgrade or downgrade all apps with the click of a button</p>
            </div>
          </div>
          <div className="flex flex-row place-items-center justify-center">
            <div className="w-380px ml-60 text-right space-y-5 mr-120px">
              <h2 className="text-heading-2 text-accent">Version History and Multi Download Support</h2>
              <p className="text-paragraph">Keep multiple versions of AppImages at the same time</p>
            </div>
            <div className="bg-contain bg-no-repeat bg-feature-pattern">
              <img className="hover:scale-105 ease-linear duration-200 rounded-md shadow-lg" width="400" src="/search.jpg" />
            </div>
          </div>
          <div className="flex flex-row place-items-center justify-center">
            <div className="bg-contain bg-no-repeat bg-feature-pattern-flipped">
              <img className="hover:scale-105 ease-linear duration-200 rounded-md shadow-lg" width="400" src="/home.jpg" />
            </div>
            <div className="w-380px mr-60 space-y-5 ml-120px">
              <h2 className="text-heading-2 text-accent">Fast Downloader</h2>
              <p className="text-paragraph">Thanks to multiprocessing and parellism, AppImage Pool downloads apps extremely quickly</p>
            </div>
          </div>
        </div>

        <div className="h-32"></div>

        <a href="https://github.com/prateekmedia/appimagepool">
          <div className="flex flex-row justify-center place-items-center space-x-8">
            <p className="text-paragraph">Free and open source forever</p>
            <img src="/github.svg" width="48" height="48" />
          </div>
        </a>

        <div className="h-32"></div>

        <div id="download" className="bg-dark-1">
          <div className="h-32"></div>
          <h1 className="text-heading-1 text-accent font-bold text-center">Download</h1>
          <div className="h-32"></div>
          <div className="flex flex-row justify-center space-x-5">
            <Button isAccented={ true } text="Flatpak" />
            <Button isAccented={ true } text="AppImage" />
            <Button isAccented={ true } text="Nightly" />
          </div>
          <div className="h-48"></div>
        </div>
      </main>
    </div>
  )
}

export default Home

export function getStaticProps() {
  const posts = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath))
    const { content, data } = matter(source)

    return {
      content,
      data,
      filePath
    }
  })

  return { props: { posts } }
}
