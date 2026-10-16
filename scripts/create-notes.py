from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from pathlib import Path
from pypdf import PdfReader

root = Path(__file__).resolve().parents[1]
out = root / 'public' / 'ohms-law-notes.pdf'
c = canvas.Canvas(str(out), pagesize=(595,842))
c.setTitle("GNOSIS | Ohm's Law - Original demo notes")
def text(x,y,s,size=11,color='#62667c',font='Helvetica'):
    c.setFillColor(HexColor(color));c.setFont(font,size);c.drawString(x,y,s)
def base(page,tag,title,subtitle):
    c.setFillColor(HexColor('#ffffff'));c.rect(0,0,595,842,fill=1,stroke=0)
    text(48,790,'GNOSIS.',20,'#4942a8','Helvetica-Bold')
    text(48,750,'PHYSICS / CURRENT ELECTRICITY',8,'#8b88a6')
    c.setStrokeColor(HexColor('#e8e5f2'));c.line(48,730,547,730)
    text(48,700,tag,9,'#4942a8','Helvetica-Bold')
    text(48,659,title,29,'#29283f','Helvetica-Bold')
    text(48,630,subtitle,10)
    c.line(48,72,547,72)
    text(48,51,'Original sample educational notes. Not an NCERT reproduction.',8,'#9392a6')
    text(510,51,f'{page} / 3',8,'#9392a6')
def heading(y,s): text(48,y,s,14,'#302e4b','Helvetica-Bold')
def lines(y,ss):
    for s in ss:text(48,y,s);y-=21
def box(y,formula,caption):
    c.setFillColor(HexColor('#f1effb'));c.roundRect(48,y-85,499,100,9,fill=1,stroke=0)
    text(76,y-22,formula,27,'#4942a8','Helvetica-Bold');text(76,y-59,caption,10)

base(1,'01 / THE CORE IDEA',"Ohm's Law",'A small equation. A useful way to see an electrical circuit.')
heading(585,'The relationship')
lines(556,['For an ohmic conductor, current is proportional to the potential',
           'difference across it when temperature and other physical',
           'conditions remain constant.'])
box(461,'V = I x R','Potential difference = current x resistance')
heading(338,'Know your quantities')
lines(309,['V : potential difference, measured in volts (V)',
           'I : electric current, measured in amperes (A)',
           'R : resistance, measured in ohms (symbol: Greek omega)'])
heading(211,'The graph tells a story')
lines(182,['For a V-versus-I graph, slope = resistance R.',
           'For an I-versus-V graph, slope = 1/R.',
           'Check the axes before interpreting a slope.'])
c.showPage()
base(2,'02 / MAKE THE CONNECTION','From idea to example','Start with what you know. Let the units guide you.')
heading(582,'Worked example')
lines(552,['A 6 ohm resistor is connected across a 12 V supply.',
           'Find the current, assuming the resistance stays constant.'])
box(468,'I = V / R = 12 / 6 = 2 A','The current through the resistor is 2 amperes.')
heading(337,'What changes if the voltage doubles?')
lines(307,['At the same resistance, I = 24 / 6 = 4 A.',
           'Doubling voltage doubles current only if resistance is constant.'])
heading(232,'A common misconception')
lines(202,["Ohm's law does not describe every electrical device.",
           'A diode is non-ohmic. A filament lamp heats up, changing its',
           'resistance. Do not assume constant R as temperature changes.'])
text(48,112,'Extension: 2 ohms + 4 ohms in series = 6 ohms total.',10,'#4942a8')
c.showPage()
base(3,'03 / PAUSE AND PRACTICE','Make it your own','A short checklist for careful problem solving.')
heading(584,'Before calculating')
lines(554,['1. Identify the known values and the quantity you need.',
           '2. Convert units: 500 mA = 0.5 A.',
           '3. Choose V = IR, I = V/R, or R = V/I.',
           '4. Check the units and the physical conditions.'])
box(438,'V = 0.5 x 10 = 5 V','A 500 mA current through 10 ohms needs a potential difference of 5 V.')
heading(307,'A quick check')
lines(277,['A straight V-I line through the origin indicates constant resistance',
           'over the measured range. A conductor is ohmic only under',
           'conditions where this proportionality holds.'])
heading(179,'Explain it to yourself')
lines(149,['Why does a greater resistance mean less current at the same voltage?',
           'Use I = V/R to connect the words and the equation.'])
c.save()
assert len(PdfReader(str(out)).pages)==3
print(f'Created {out}: 3 pages')
