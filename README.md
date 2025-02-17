# Requirements
- Mac/Linux or Windows with [WSL](https://learn.microsoft.com/en-us/windows/wsl/install)
- Node 20
- yarn
- Python 3

### Backend Setup
- Create [python venv](https://docs.python.org/3/library/venv.html): `python -m venv ~/skarlatov-venv`
- Activate python venv: `source ~/skarlatov-venv/bin/activate`
- Install python dependencies: `python -m pip install -r requirements.txt`
- Run the migrations: `python manage.py migrate`
- Seed databse with test users: `python manage.py seed_db` (available users are "user1" and "user2", password for both is "pass123")
- Run the unit tests: `python manage.py test`
- Start the server: `python manage.py runserver`

### Frontend Setup
- Inside the web folder run: `yarn install`
- Run the tests: `yarn test`
- Start the dev server: `yarn start`
