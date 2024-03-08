import { generatePalette } from './generate-palette.js'
import { generateCss } from './generate-css.js'
import fs from 'fs'
import puppeteer from 'puppeteer'
import path from 'path'


const TEMPLATE_FILE = path.resolve(process.cwd(), 'template.html')

async function generate({ backgroundColor, textColor, buttonColor, options = { save: false }}) {
    const palette = generatePalette({
        backgroundColor,
        textColor,
        buttonColor
    })
    
    const css = generateCss({...palette, backgroundColor, textColor, buttonColor})

    const cssName = `${backgroundColor}-${textColor}-${buttonColor}.css`
    // Save to output folder for reference of all generated colors
    fs.writeFileSync(path.resolve('output', cssName), css)
    
    // Save to custom-palette so it can be used to inspect the colors in the browser with template.html
    if(options.save) {
        fs.writeFileSync('custom-palette.css', css)
    }

    const browser = await puppeteer.launch()
    
    const page = await browser.newPage()
    page.setViewport({ width: 1920, height: 1920 })
    await page.goto(`file://${TEMPLATE_FILE}`)

    // Update reference colors in the template 
    await page.evaluate(({ backgroundColor, textColor, buttonColor }) => {
        let backgroundColorEl = document.querySelector('.backgroundColor')
        let textColorEl = document.querySelector('.textColor')
        let buttonColorEl = document.querySelector('.buttonColor')
        backgroundColorEl.innerHTML = 'Background: ' + backgroundColor
        textColorEl.innerHTML = 'Text: ' + textColor
        buttonColorEl.innerHTML = 'Button: ' + buttonColor
    }, { backgroundColor, textColor, buttonColor })

    await page.addStyleTag({ content: css })

    await page.screenshot({ path: path.resolve('output', `screenshot-bg-${backgroundColor}-text-${textColor}-btn-${buttonColor}.png`) })
    await browser.close()

}


await generate({
    backgroundColor: '#ba2828',
    textColor: '#a69b9b',
    buttonColor: '#ffffff'
})


await generate({
    backgroundColor: '#0a2540',
    textColor: '#0a2540',
    buttonColor: '#006bff'
})

await generate({
    backgroundColor: '#0DF31E',
    textColor: '#9C7FD9',
    buttonColor: '#F2ED07',
    
})

await generate({
    backgroundColor: '#0B942D',
    textColor: '#262A29',
    buttonColor: '#07F2BC',
})