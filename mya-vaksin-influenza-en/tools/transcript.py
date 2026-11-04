# English version (IMG_8568). Cue timings in SOURCE seconds, from the Descript transcript
# (project "Mya Clinic - IMG_8568 (transcript)").
# Cuts (the gaps between cues) were matched to Descript's own edit by comparing its
# edited-timeline SRT offsets with the audio energy map:
#   0.98-5.0     "Hi, are you a pregnant mom worried about getting the influenza vaccine?"  (Meta personal attributes)
#   62.12-66.45  "than actually the vaccine itself." + false start "Myth,"   (client request)
#   68.07-69.20  false start "I had my inv--"
#   73.44-74.79  false start "Influenza vac--"
#   78.44-79.99  false start "we advise all--"
CUES = [
    (5.065, 9.204, "Myth number one, the influenza vaccine is harmful to me and baby."),
    (9.752, 10.467, "This is false."),
    (10.847, 15.242, "The influenza vaccine is an inactivated vaccine, and numerous studies have shown"),
    (15.489, 17.602, "that it is safe for both mom and baby."),
    (17.943, 21.384, "Myth number two, I can't take the vaccine in my first trimester."),
    (21.670, 22.399, "This is false."),
    (22.677, 26.491, "It is safe to be taken in all three trimesters, and important to take it"),
    (26.551, 30.124, "early so that both mom and baby are protected all throughout pregnancy."),
    (30.647, 34.263, "Myth number three, the vaccine only protects mom but not baby."),
    (34.589, 35.330, "This is false."),
    (35.611, 39.424, "When mom takes the vaccine, it passes on passive immunity to the baby and"),
    (39.445, 41.650, "also until six months after delivery."),
    (41.969, 45.907, "So protection is given for both mom and baby for this whole time."),
    (46.529, 49.811, "Myth number four, how bad can influenza be?"),
    (49.995, 51.729, "Surely it's just like a common cold."),
    (52.132, 56.724, "Actually, especially for pregnant mothers and immunocompromised individuals, they"),
    (56.725, 61.538, "can get severe infection from influenza, and this can be even more harmful to mom"),
    (61.538, 62.000, "and baby."),
    (66.510, 67.850, "Myth number five,"),
    (69.260, 70.437, "I had my influenza vaccine"),
    (70.437, 72.325, "last year, I don't need it this year."),
    (72.679, 73.318, "This is false."),
    (74.850, 78.320, "The influenza virus mutates very rapidly and therefore"),
    (80.050, 83.728, "we advise everyone to get vaccinated against this virus on"),
    (83.729, 87.643, "a yearly basis so that we're always protected against the latest version."),
    (88.012, 89.844, "So pregnant mommies, what are you waiting for?"),
    (90.159, 91.990, "Get your influenza vaccine today."),
]

# (source time the myth starts, source time of the answer, short on-screen myth)
MYTHS = [
    (5.065, 9.752, "The flu vaccine is harmful to mom &amp; baby"),
    (17.943, 21.670, "I can't take it in my first trimester"),
    (30.647, 34.589, "It only protects mom, not baby"),
    (46.529, 52.132, "Flu is just like a common cold"),
    (66.510, 72.679, "I had it last year, I don't need it again"),
]
