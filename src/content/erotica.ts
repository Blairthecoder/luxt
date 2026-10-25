/**
 * The Erotica section at /erotica: original sensual short fiction and reading
 * lists for adults. Stories stay non-explicit: desire, tension and consent on
 * the page, and the door closes before anything graphic. Every character is an
 * adult. Bodies are Markdown, rendered on the server (src/lib/erotica.ts).
 */
export interface EroticaEntry {
  slug: string
  kind: 'story' | 'reading-list'
  title: string
  metaTitle: string
  metaDescription: string
  excerpt: string
  publishedAt: string
  updatedAt?: string
  readMinutes: number
  /** Short mood labels shown on cards, e.g. "Slow Burn". */
  moods: string[]
  /** Nightstand Notes guides that pair with this piece. */
  guides: string[]
  /** Lingerie or toy collections at /shop/<slug> that fit the mood. */
  collections?: string[]
  body: string
}

export const EROTICA: EroticaEntry[] = [
  {
    slug: 'the-black-lace-bodysuit',
    kind: 'story',
    title: 'The Black Lace Bodysuit',
    metaTitle: 'The Black Lace Bodysuit: A Sensual Short Story',
    metaDescription:
      'A sensual short story about a woman who buys lingerie for no one but herself, and finds the confidence she had been waiting for someone else to give her.',
    excerpt:
      'Maya bought it for no one. That was the point. A short, sensual story about the night she finally saw herself the way she wanted to be seen.',
    publishedAt: '2026-10-25',
    readMinutes: 6,
    moods: ['Self-Love', 'Slow Burn'],
    guides: ['how-to-feel-confident-in-lingerie', 'how-to-feel-confident-in-bed', 'solo-date-night-ideas'],
    collections: ['lace-bodysuits', 'comfortable-lingerie'],
    body: `
Maya bought it for no one. That was the point.

The box sat on her dresser for three days, tissue paper still folded over the top, because opening it felt like a promise she wasn't sure she could keep. She had told herself it was an impulse, a late-night click after a long week. But she had read the fit notes twice. She had checked the size chart against a tape measure. Impulses didn't measure.

On Friday she came home, kicked off her shoes and ran a bath before she could talk herself out of it.

## The Ritual

She lit the candle her sister had given her two birthdays ago, the one that smelled like fig and cedar and had never once been lit. She put on the record she only played when the apartment was empty. She stayed in the water until her shoulders stopped living up near her ears.

Then she stood in front of the mirror in her towel and waited for the old voice to start.

It always started at her stomach. Then her thighs. Then the soft place under her arms she never let anyone photograph. The voice had a lot of opinions, and for years she had treated them like facts.

Tonight she let it talk, and she opened the box anyway.

## Black Lace

The bodysuit was lighter than she expected, barely there in her hands, a sketch of a garment drawn in black thread. She stepped into it slowly, the way you step into cold water, and pulled the straps over her shoulders.

The lace sat against her skin like a held breath.

She didn't look right away. She adjusted a strap. She smoothed the fabric over her hips with both palms and felt the warmth of her own hands through the mesh, and something in her chest went quiet and curious.

When she finally looked up, she did not see a list of problems.

She saw the curve of her waist where the lace pulled in, the line of her collarbone in the candlelight, her own eyes looking back with something she had not seen there in a long time. Not approval exactly. Interest. As if she had walked into a room and noticed someone worth talking to.

"Oh," she said out loud, to no one. "There you are."

## For Herself

She poured a glass of wine she had been saving. She turned the record over. She danced, badly, in the middle of her bedroom with the curtains closed, and laughed when she bumped the bedpost, and kept dancing.

At some point she lay back across the duvet and let her fingertips trace the scalloped edge of the lace along her hip, slow and unhurried, paying attention to the way her skin answered. She was in no rush. There was no one to perform for and nothing to prove. Just the candle, the music and the warm, rising hum of her own attention, which she had been giving away to everyone else for years.

What happened next was hers, and she kept it.

## Saturday

In the morning she folded the bodysuit back into its tissue paper, not to hide it but to keep it nice. She caught her reflection in the hallway mirror on her way to coffee, hair a mess, wearing an old T-shirt, and she smiled at herself the way you smile at someone who knows your secret.

The voice was still there. It probably always would be. But it sounded smaller now, a little unsure of itself, like it had noticed someone else had started talking.

She had bought it for no one.

It turned out that no one was her.
`,
  },
  {
    slug: 'slow-sunday',
    kind: 'story',
    title: 'Slow Sunday',
    metaTitle: 'Slow Sunday: A Romantic Short Story for Couples',
    metaDescription:
      'A tender, sensual short story about a long-married couple who put their phones away for one slow Sunday and remember how to really see each other.',
    excerpt:
      'Twelve years, two kids and a mortgage in, Elena and Sam agree to one rule for a single day: no phones, no plans, no rush. A sensual story about rediscovering each other.',
    publishedAt: '2026-10-25',
    readMinutes: 7,
    moods: ['Married Couple', 'Reconnection'],
    guides: ['reconnect-with-your-husband-when-you-feel-unseen', 'sensate-focus-exercises-for-couples', 'non-sexual-intimacy-ideas'],
    collections: ['couples-sex-toys', 'babydoll-lingerie'],
    body: `
The kids were at Elena's mother's until six. The rule had been Sam's idea, which surprised her: no phones, no errands, no plans. Just the two of them, the whole day, and nowhere to be.

"What do we even do?" she had asked.

"I don't know," he said. "That's sort of the point."

## Morning

She woke before him out of habit and lay still, listening to the house be quiet. No cartoons, no thumping on the stairs. Just rain against the window and Sam's slow breathing beside her.

She looked at him properly for the first time in what felt like months. The gray coming in at his temples. The small scar on his jaw from the bike accident the year they met. His hand, open on the pillow between them, wedding ring a little loose now.

When had she stopped looking? Not on purpose. It had just slipped away under school forms and dentist appointments and the endless logistics of a shared life. They talked every day. They just didn't see each other anymore.

She slid her hand into his. He woke up smiling, eyes still closed.

"Is it Sunday?" he murmured.

"It's Sunday."

## Coffee and the Old Robe

He made coffee the slow way, the pour-over they had registered for at their wedding and used maybe four times. She pulled on the silk robe she had stopped wearing because it felt silly to wear silk to pack lunches.

When she came into the kitchen he stopped, kettle in hand, and just looked at her.

"What?" she said, suddenly self-conscious, pulling the robe tighter.

"Nothing," he said. "I forgot about that robe." He set the kettle down. "I forgot about a lot of things."

They drank coffee on the couch with their legs tangled, and talked about nothing that mattered: the book she had been meaning to finish, a trip they had always said they would take, the terrible band he had played bass in at twenty-two. She laughed so hard she spilled coffee on the robe and didn't care.

## Afternoon

Later, the rain still going, he asked if he could give her a back rub, and she almost said she was fine, because that was her reflex. Then she remembered the rule and said yes.

His hands were warm and slow. He wasn't trying to get anywhere. He just traced the long muscles along her spine, the tight place under her shoulder blade, the knot she carried at the base of her neck from twelve years of carrying everything. She felt herself melt into the couch cushions a little at a time.

"Is this okay?" he asked, his voice low against her ear.

"More than okay," she said, and meant it.

She turned over to look at him. He was looking back the way he used to, a long time ago, before they knew how hard and ordinary and wonderful a life together would be. Curious. Unhurried. Like there was still more of her to find.

She pulled him down to her by the front of his shirt.

The rain kept on against the windows. The coffee went cold on the table. Somewhere in the house a clock ticked through the afternoon, and for once, neither of them was counting.

## Six O'Clock

When the car pulled into the driveway, Elena was in the kitchen in jeans and the robe was back in the closet, but she was humming. Sam caught her eye across the counter as the kids burst through the door, and he winked, and she blushed like she was twenty-five.

"What did you guys do all day?" their daughter asked, dumping her backpack on the floor.

Sam shrugged. "Nothing much."

Elena smiled into the sink. "Nothing much," she agreed.

They put the next slow Sunday on the calendar that night, in pen.
`,
  },
  {
    slug: 'the-second-first-date',
    kind: 'story',
    title: 'The Second First Date',
    metaTitle: 'The Second First Date: A Story About Starting Over',
    metaDescription:
      'A sensual short story about a woman going on her first date after divorce, and learning that wanting something again can feel brave instead of frightening.',
    excerpt:
      'Two years after the divorce, Renee says yes to dinner with a man from her pottery class. A warm, sensual story about nerves, honesty and wanting again.',
    publishedAt: '2026-10-25',
    readMinutes: 7,
    moods: ['Starting Over', 'First Kiss'],
    guides: ['sexual-confidence-after-divorce', 'how-to-set-sexual-boundaries', 'how-to-ask-for-what-you-want-in-bed'],
    collections: ['lingerie-sets', 'plus-size-lingerie'],
    body: `
Renee changed her outfit four times and settled on the first one.

It had been two years since the divorce and nineteen since her last first date, and she was fairly sure the rules had changed in the meantime. Her daughter had offered to coach her. She had declined, then quietly read three articles about it on her phone in the car.

His name was Daniel. He sat two wheels over in Thursday pottery class and was, by his own cheerful admission, terrible at it. Every week his bowls collapsed. Every week he laughed and started again. That was the thing she had noticed first: how easily he started again.

## The Restaurant

He was already there when she arrived, standing up from the table a little too fast and nearly knocking over the water glass. She liked him immediately for that.

"I should tell you," she said, before she had even sat down, because she had promised herself she would be honest, "I haven't done this in a very long time. I might be bad at it."

He grinned. "Have you seen my bowls?"

She laughed, and the knot in her stomach loosened a notch.

They talked for three hours. About his late wife, gently, and her ex-husband, less gently. About her daughter starting college and his son who had just moved to Denver. About what it is like to wake up at fifty-two in a life you did not plan, and slowly decide you might like it anyway.

He listened the way people rarely do, leaning in, asking the second question instead of waiting for his turn to talk.

## The Walk

Afterward he walked her to her car. It was October and cold enough to see their breath, and she was wearing the good coat, the one she bought for herself the week the papers were signed.

At the car she turned to say goodnight and found him closer than she expected. Not crowding. Just there.

"Can I kiss you?" he asked.

Nobody had asked her that in a very long time. Maybe ever. She felt it land somewhere warm and surprising in her chest: the simple courtesy of a question, the space it left for her answer.

"Yes," she said. "I'd like that."

## The Kiss

It was careful at first, a question asked twice. His hand came up to rest lightly at her jaw, cool from the night air, and she leaned into it before she had decided to. Then she stopped thinking about whether she was doing it right, and simply kissed him back.

She had forgotten this. Not just the kiss, but the feeling underneath it: the slow rising warmth of wanting someone and being wanted back. For years she had thought that part of her had gone quiet for good, packed away with the wedding china. It hadn't. It had only been waiting for her to feel safe enough to let it out.

When they pulled apart her heart was going fast and her cheeks were hot despite the cold.

"Well," she said, a little breathless. "It turns out I'm not bad at that."

"Not even a little," he said.

## Home

She did not invite him back that night. Not because she didn't want to, but because she wanted to take her time and enjoy every part of this, and she told him so. He smiled like she had given him a gift.

"Thursday?" he asked.

"Thursday," she said. "Try not to break any bowls before then."

On the drive home she turned the radio up and sang along to a song she had not heard in twenty years. At a red light she caught her own eyes in the rearview mirror, bright and a little wild, and she thought: there she is. The woman who wants things. The woman who asks.

She had been gone a long time.

It was very good to have her back.
`,
  },
  {
    slug: 'erotica-books-for-women',
    kind: 'reading-list',
    title: 'Steamy Books for Women: 15 Romance and Erotica Novels to Start With',
    metaTitle: 'Steamy Books for Women: 15 Romance & Erotica Novels',
    metaDescription:
      'Steamy books for women, from sweet-and-spicy romance to literary erotica classics. 15 novels sorted by heat level, with who each one suits best.',
    excerpt:
      'New to steamy reading, or looking for your next one? Fifteen romance and erotica novels sorted from warm to scorching, with who each one suits.',
    publishedAt: '2026-10-25',
    readMinutes: 9,
    moods: ['Reading List', 'Romance'],
    guides: ['responsive-vs-spontaneous-desire', 'solo-date-night-ideas', 'how-to-spice-up-your-marriage'],
    body: `
Reading is one of the easiest ways to wake up desire. Sex educators often recommend it for a simple reason: arousal starts in the mind, and a good story gives your imagination somewhere to go. If you have read about [responsive desire](/blog/responsive-vs-spontaneous-desire), you know that a little anticipation can make all the difference.

This list runs from warm to very steamy. We have noted the heat level so you can pick a starting point that feels right. Our descriptions stay PG; the books themselves may not.

## Warm: Romance With a Little Spice

These are romance-first, with chemistry that simmers and a few on-page scenes.

1. **Beach Read by Emily Henry.** Two rival novelists swap genres for a summer. Witty, emotional and slow-burning. Best for: readers who love banter.
2. **The Hating Game by Sally Thorne.** Office enemies to lovers, with sharp dialogue and great tension. Best for: an easy, fun first pick.
3. **The Duke and I by Julia Quinn.** The first Bridgerton novel, a Regency romance with a fake courtship. Best for: period drama fans.
4. **Red, White & Royal Blue by Casey McQuiston.** The president's son and a British prince, from rivals to secret romance. Best for: big-hearted, funny love stories.

## Steamy: Chemistry on the Page

Romance where the intimate scenes are a big part of the story.

5. **The Kiss Quotient by Helen Hoang.** An autistic economist hires an escort to teach her about intimacy. Tender and very steamy. Best for: readers who love a confident, caring hero.
6. **Outlander by Diana Gabaldon.** A WWII nurse falls through time into 18th-century Scotland. Epic, romantic and sensual. Best for: long, immersive reads.
7. **A Court of Thorns and Roses by Sarah J. Maas.** Fantasy romance that heats up as the series goes on. Best for: readers who want magic with their romance.
8. **Fourth Wing by Rebecca Yarros.** Dragon riders, a war college and an enemies-to-lovers spark. Best for: fast-paced fantasy fans.
9. **Ice Planet Barbarians by Ruby Dixon.** Playful sci-fi romance that does not take itself too seriously. Best for: readers who want something light and fun.

## Scorching: Erotic Romance

The intimate scenes are frequent and detailed. Great for date nights or reading aloud together.

10. **Bared to You by Sylvia Day.** An intense, emotional romance between two people with complicated pasts. Best for: readers who like drama and heat.
11. **Fifty Shades of Grey by E L James.** The book that brought erotic romance into the mainstream. Best for: curious first-timers who want to see what the fuss was about.
12. **The Siren by Tiffany Reisz.** A literary, kink-aware erotic novel about an erotica writer and her editor. Best for: readers who like their steam with depth.

## Classics: Literary Erotica

Older books that are still read for their beauty as much as their heat.

13. **Delta of Venus by Anaïs Nin.** Short erotic stories written in the 1940s, sensual and poetic. Best for: short reads before bed.
14. **Lady Chatterley's Lover by D.H. Lawrence.** Once banned, now a classic about desire, class and freedom. Best for: literary readers.
15. **Little Birds by Anaïs Nin.** A companion collection to Delta of Venus, lush and dreamlike. Best for: anyone who loved number 13.

## How to Make Reading Part of Your Sex Life

- **Read before bed instead of scrolling.** It is a gentler transition into intimacy than a phone.
- **Read aloud to a partner.** It feels silly for about a minute, then it does not. Our guide to [spicing up a long marriage](/blog/how-to-spice-up-your-marriage) has more ideas.
- **Plan a solo evening around a book.** A bath, a candle, a chapter or three. See our [solo date night ideas](/blog/solo-date-night-ideas).
- **Notice what you like.** The scenes that stay with you can tell you a lot about what you want. That is useful information to bring to a partner.

If you would rather start with something short, try our original [sensual short stories](/erotica), written to be tasteful, romantic and confidence-building.
`,
  },
  {
    slug: 'books-on-sexual-confidence-for-women',
    kind: 'reading-list',
    title: 'Books on Sexual Confidence for Women: 10 Reads That Change How You Feel',
    metaTitle: 'Books on Sexual Confidence for Women: 10 Must-Reads',
    metaDescription:
      'The best books on sexual confidence and pleasure for women, from Come As You Are to Mating in Captivity. 10 nonfiction reads that help you feel at home in your body.',
    excerpt:
      'Ten nonfiction books that help women understand desire, quiet the inner critic and feel more confident in bed, with who each one is best for.',
    publishedAt: '2026-10-25',
    readMinutes: 7,
    moods: ['Reading List', 'Confidence'],
    guides: ['sexual-empowerment-for-women', 'how-to-feel-confident-in-bed', 'responsive-vs-spontaneous-desire'],
    body: `
Sometimes the most confidence-building thing you can do is learn that you are normal. These books do exactly that. Each one explains something about desire, bodies or relationships that most of us were never taught, and many readers say they finished feeling lighter.

## Start Here

1. **Come As You Are by Emily Nagoski.** The book on women's sexuality that sex educators recommend most. It explains the "accelerator and brakes" model of arousal and why stress, body image and context matter so much. Best for: anyone who has ever wondered if something is wrong with them. (Spoiler: probably not.) Pairs with our guide to [responsive vs. spontaneous desire](/blog/responsive-vs-spontaneous-desire).
2. **She Comes First by Ian Kerner.** A practical, respectful guide to women's pleasure, written for partners but useful for everyone. Best for: couples who want to understand clitoral pleasure. See our [clitoris anatomy guide](/blog/clitoris-anatomy-guide) for the basics.

## For Long-Term Relationships

3. **Mating in Captivity by Esther Perel.** Why desire fades in safe, loving relationships, and how to bring curiosity and mystery back. Best for: couples who love each other but miss the spark.
4. **The State of Affairs by Esther Perel.** A thoughtful look at infidelity, desire and what people are really looking for. Best for: anyone rebuilding trust or rethinking what they want.
5. **Wired for Love by Stan Tatkin.** How attachment shapes the way couples connect, argue and make up. Best for: partners who want to feel safer with each other.

## For Body Confidence

6. **The Body Is Not an Apology by Sonya Renee Taylor.** A powerful case for radical self-love and letting go of body shame. Best for: anyone tired of fighting their reflection.
7. **More Than a Body by Lindsay Kite and Lexie Kite.** Practical tools for body image resilience, from two researchers. Best for: readers who want exercises, not just inspiration. Pair it with [how to feel confident in bed](/blog/how-to-feel-confident-in-bed).

## For Pleasure and Curiosity

8. **Girl Sex 101 by Allison Moon.** A warm, inclusive guide to pleasure between women, full of practical advice. Best for: queer women and the curious.
9. **Pleasure Activism by adrienne maree brown.** Essays on joy, pleasure and why feeling good is worth taking seriously. Best for: readers who want big ideas.
10. **Bonk by Mary Roach.** A funny, fascinating tour of the science of sex. Best for: anyone who learns best through laughter.

## How to Get the Most From These Books

- **Read with a pencil.** Underline what makes you think "that's me."
- **Share a passage with a partner.** It is an easy way to open a conversation that feels hard to start. Our guide to [asking for what you want in bed](/blog/how-to-ask-for-what-you-want-in-bed) has scripts if you get stuck.
- **Go slowly.** Some of these books stir up old feelings. That is part of the process.

When you are ready for something lighter, our [steamy reading list](/erotica/erotica-books-for-women) has romance and erotica novels for every heat level, and our [sexual empowerment guide](/blog/sexual-empowerment-for-women) puts it all into practice.
`,
  },
]

export const EROTICA_BY_SLUG: Record<string, EroticaEntry> = Object.fromEntries(EROTICA.map((e) => [e.slug, e]))

export const STORIES = EROTICA.filter((e) => e.kind === 'story')
export const READING_LISTS = EROTICA.filter((e) => e.kind === 'reading-list')
