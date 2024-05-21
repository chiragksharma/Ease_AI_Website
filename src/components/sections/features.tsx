import { Card } from "../ui/card";

export default function Features() {
  return (
    <section>
      <div className=" space-y-6 rounded-md bg-secondary py-14 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-4xl md:text-6xl">
            Features to Power Your Channel
          </h2>
          <p className="max-w-[85%] text-balance leading-normal text-primary/70 sm:text-lg sm:leading-7">
            Your Assistant For Youtube Scripts, Thumbnails, Analytics and
            Everything in Between!
          </p>
        </div>
        <div className="mx-auto grid gap-4 text-center md:max-w-[64rem] md:grid-cols-2 lg:grid-cols-2">
          <div className="md:col-span-2">
            <Card className="flex h-[400px] flex-col justify-between rounded-md p-6">
              <video controls className="h-[240px] w-full rounded-md">
                <source src="/path/to/demo-video1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <h3 className="mt-4 text-xl font-bold">AI Thumbnail Generator</h3>
              <p className="text-balance text-sm text-muted-foreground">
                Stand out in the sea of videos with thumbnails that pop. Enter
                your video idea or image prompt, and utilize our face swap
                feature to save time on posing and photoshoots.
              </p>
            </Card>
          </div>
          <Card className="flex h-[300px] flex-col justify-between rounded-md p-6">
            <video controls className="h-[160px] w-full rounded-md">
              <source src="/path/to/demo-video2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <h3 className="mt-4 text-xl font-bold">Script Maker</h3>
            <p className="text-balance text-sm text-muted-foreground">
              Overcome writer's block with scripts that resonate. Just give us a
              topic, and we'll draft a script that echoes your voice and any
              language.
            </p>
          </Card>
          <Card className="flex h-[300px] flex-col justify-between rounded-md p-6">
            <video controls className="h-[160px] w-full rounded-md">
              <source src="/path/to/demo-video3.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <h3 className="mt-4 text-xl font-bold">MetaData Assistant</h3>
            <p className="text-balance text-sm text-muted-foreground">
              Auto-generate your titles, descriptions, and tags - all SEO
              optimized.
            </p>
          </Card>
          <div className="md:col-span-2">
            <Card className="flex h-[400px] flex-col justify-between rounded-md p-6">
              <video controls className="h-[240px] w-full rounded-md">
                <source src="/path/to/demo-video4.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <h3 className="mt-4 text-xl font-bold">AnalyticsChat</h3>
              <p className="text-balance text-sm text-muted-foreground">
                Your stats have stories to tell. Our chat interface makes data
                easy to digest, so you can focus on creating, not crunching
                numbers.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
