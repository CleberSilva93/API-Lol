from PIL import Image

champions = ["Aatrox", "Ahri", "Akali", "Alistar", "Amumu", "Anivia", "Annie", "Aphelios", "Ashe",
             "AurelionSol", "Azir", "Bard", "Blitzcrank", "Brand", "Braum", "Caitlyn", "Camille", "Cassiopeia", "Chogath",
             "Corki", "Darius", "Diana", "Draven", "DrMundo", "Ekko", "Elise", "Evelynn", "Ezreal", "FiddleSticks", "Fiora",
             "Fizz", "Galio", "Gangplank", "Garen", "Gnar", "Gragas", "Graves", "Hecarim", "Heimerdinger", "Illaoi", "Irelia",
             "Ivern", "Janna", "JarvanIV", "Jax", "Jayce", "Jhin", "Jinx", "Kaisa", "Kalista", "Karma", "Karthus", "Kassadin",
             "Katarina", "Kayle", "Kayn", "Kennen", "Khazix", "Kindred", "Kled", "KogMaw", "Leblanc", "LeeSin", "Leona", "Lillia",
             "Lissandra", "Lucian", "Lulu", "Lux", "Malphite", "Malzahar", "Maokai",  "MasterYi", "MissFortune", "MonkeyKing", "Mordekaiser",
             "Morgana", "Nami",  "Nasus", "Nautilus",  "Neeko", "Nidalee",  "Nocturne", "Nunu", "Olaf", "Orianna",  "Ornn",
             "Pantheon", "Poppy",  "Pyke", "Qiyana", "Quinn", "Rakan", "Rammus", "RekSai",  "Renekton",  "Rengar", "Riven",
             "Rumble", "Ryze", "Samira",  "Sejuani", "Senna", "Seraphine", "Sett",  "Shaco", "Shen", "Shyvana",
             "Singed",  "Sion",  "Sivir", "Skarner", "Sona", "Soraka", "Swain",  "Sylas", "Syndra", "TahmKench",
             "Taliyah", "Talon", "Taric", "Teemo",  "Thresh", "Tristana",  "Trundle", "Tryndamere", "TwistedFate", "Twitch",
             "Udyr", "Urgot", "Varus", "Vayne", "Veigar", "Velkoz", "Vi", "Viktor", "Vladimir", "Volibear", "Warwick",
             "Xayah", "Xerath", "XinZhao", "Yasuo", "Yone", "Yorick", "Yuumi", "Zac", "Zed", "Ziggs", "Zilean", "Zoe", "Zyra"]

crop_baixo = ['Aatrox','Alistar','Amumu','Anivia','Annie','Blitzcrank','Cassiopeia','Corki','Chogath','FiddleSticks','Gnar','Heimerdinger','Katarina','Kayn','Khazix','KogMaw','Lucian','Malphite','Maokai','Nocturne','Nunu','Rammus','RekSai','Diana','Skarner','TahmKench','Teemo','Twitch','Udyr','Velkoz','Warwick','Zac','Ziggs']

mais_crop = ['KogMaw','Malphite','Gnar','Khazix']

crop_cabeca = ['Taric','Leona','Fiora','Galio','Illaoi','Irelia','Yone','Volibear','Yorick','Swain','Shen','Sett']

ajustes = ['Malphite']

for x in ajustes:
    image = Image.open(x+'_0.jpg')
    box = (0, 350, 1215, 525)
    cropped_image = image.crop(box)
    cropped_image.save(x+'_0_desktop.jpg')

