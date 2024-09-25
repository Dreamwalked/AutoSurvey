import puppeteer from 'puppeteer'
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const fillForm = async (link) => {
    try {
        const browser = await puppeteer.launch({ headless: true })
        const page = await browser.newPage()
        await page.goto(link)
        await sleep(2000)
        for (const question in questions) {
            if (question === "q4") {
                await page.click('div[role="listbox"][aria-labelledby="i61"]')
                await sleep(500)
                const random = Math.random()
                for (const option in questions[question]) {
                    if (random < questions[question][option]) {
                        await page.click(`div[role="option"][data-value="${option}"]`)
                        await sleep(500)
                        break
                    }
                }
            }
            else if (question === "q7") {
                const random = Math.random()
                for (const option in questions[question]) {
                    if (random < questions[question][option]) {
                        await page.click(`div[aria-label="${option}"]`)
                        break
                    }
                }

            }
            else if (question === "q9" || question === "q10") {
                const random = Math.random()
                const input = question === "q9" ? 'input.whsOnd.zHQkBf[aria-labelledby="i108"]' : 'input.whsOnd.zHQkBf[aria-labelledby="i112"]';
                for (const option in questions[question]) {
                    if (random < questions[question][option]) {
                        await page.type(input, option)
                        break
                    }
                }

            }
            else {
                const random = Math.random()
                for (const option in questions[question]) {
                    if (random < questions[question][option]) {
                        await page.click(option)
                        break
                    }
                }

            }
            await sleep(250)
        }
        await sleep(200)
        await page.click('div[aria-label="Submit"]');
        await sleep(100)
        console.log("form submitted")
        await browser.close()
    }
    catch (err) {
        console.log("form errored")
    }
}

const questions = {
    "q1": {
        "#i5": 0.114,
        "#i8": 0.271,
        "#i11": 0.4,
        "#i14": 0.929,
        "#i17": 0.929,
        "#i20": 0.972,
        "#i23": 1.0
    },
    "q2": {
        "#i30": 0.743,
        "#i33": 0.814,
        "#i36": 0.864,
        "#i39": 1.0
    },
    "q3": {
        "#i46": 0.071,
        "#i49": 0.2,
        "#i52": 0.529,
        "#i55": 0.686,
        "#i58": 1.0
    },
    "q4": {
        "<1 year": 0.243,
        "1-2 years": 0.457,
        "3-5 years": 0.514,
        "5-10 years": 0.528,
        "10+ years": 0.728,
        "No license": 1.0
    },
    "q5": {
        "#i69": 0.8,
        "#i72": 0.886,
        "#i75": 0.929,
        "#i78": 1.0
    },
    "q6": {
        "#i85": .129,
        "#i88": 1
    },
    "q7": {
        "1": 0.086,
        "2": 0.129,
        "3": 0.172,
        "4": 0.229,
        "5": 0.4,
        "6": 0.457,
        "7": 0.686,
        "8": 0.8,
        "9": 0.843,
        "10": 1.0
    },
    "q8": {
        "#i99": .437,
        "#i102": .691,
        "#i105": 1
    },
    "q9": {
        "10": .2,
        "$10": .4,
        "$100": .5,
        "$50": .6,
        "50": .7,
        "$10-$20": .76,
        "10-20": .83,
        "$25": .88,
        "$75": .94,
        "250": 1
    },
    "q10": {
        "No": .25,
        "no": .5,
        "n/a": .6,
        "N/A": .75,
        "Yes": .82,
        "yes": .9,
        "Face id": 1
    }
}

const formLink = ""
fillForm(formLink)
for(let i=0; i<3; i++){
    for(let i=0; i<10; i++){
        fillForm(formLink)
    }
    await sleep(5000)
}
