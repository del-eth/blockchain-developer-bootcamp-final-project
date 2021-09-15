# blockchain-developer-bootcamp-final-project

## Proof-of-Trees
Proof of Trees is a protocol that allows for individuals to participate in carbon-neutralizing activities (planting trees), submit evidence of the activity to a DAO/Kleros-like court, and then be issued a carbon credit ERC20 token. They could sell that carbon credit to a company needing to offset their emissions. The idea is to allow a marketplace for anyone to plant a tree and receive a small rebate in the form of a carbon credit, and to provide a more direct path for carbon emitters to offset emissions.


### Participants:
- Hippies - end-users who submit an image to a database, signed via the Proof of Trees application and the user's key, and request carbon tokens issued via the Proof of Trees DAO. When receiving tokens, they are free to issue them as needed.
- Curators - users in the DAO who review submissions by Hippies and payout if the planted tree is both original (not submitted based on geolocation/EXIF data) and meets other criteria. 


### Some assumptions
1. These credits are recognized as legitimate by governments. Government buy-in or acceptance "exists" in this scenario. There is some need or intrinsic demand for these carbon-offsetting tokens which could be retired or burned like a real carbon credit by carbon emitters.
2. Some governing DAO has an agreed-upon process and software that correctly signs the artifacts (images of trees) for upload. The version of the submission software signs the image with something that can be verified. The DAO has agreed on this input software and is confident it will prevent EXIF data from being spoofed/faked on submission. There will be some centralizing factors since storing images on the blockchain is impractical. The idea is that a version of the software and how it signs, where it uploads to, and what database curators work from is known and agreed upon by some process.

### Workflow
- Hippy plants a tree in the real world
- photos taken of planted trees (or other proof of green activity) uploaded to some service and signed by some app. Includes geolocation data.
- Kleros-style court approves images
- tree-proof provider gets some amount of blockchain carbon credit (or appeals with more evidence)
- buyers can be people needing to offset carbon emission

### Other considerations
- governance token used to participate in court/carbon credit-generation decisions and get fees from exchanges of credits
- burn mechanism is akin to retiring a carbon credit, emitters could submit proof-of-carbon-neutrality to governing bodies