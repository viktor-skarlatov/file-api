### Requirements
- Mac/Linux/Windows
- Node 20
- yarn 1.22
- Python 3

### Backend Setup
- Create [python venv](https://docs.python.org/3/library/venv.html): `python -m venv ~/skarlatov-venv`
- Activate python venv: `source ~/skarlatov-venv/bin/activate`
- Install python dependencies: `python -m pip install -r requirements.txt`
- Run the migrations: `python manage.py migrate`
- Seed databse with test users: `python manage.py seed_db` (available users are "user1" and "user2", password for both is "pass123")
- Run the tests: `python manage.py test fileapi.test_all`
- Start the server: `python manage.py runserver`

### Frontend Setup
- Inside the web folder run: `yarn install`
- Run the tests: `yarn test`
- Start the server: `yarn start`

### Notes
Please note that the api and web projects do not have extensive unit tests because this is a demo project. The tests that are added just showcase the way I write tests.

### Known Issue
When the user uploads a file rtk query immediately tries to refetch the list of files but the
Django api returns the old list. There is some delay possibly file system related that causes
this. If the user refreshes the page it shows correctly.
