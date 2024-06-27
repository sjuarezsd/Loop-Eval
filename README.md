# Loop-Eval

Instructions for building container and running tests:

1. Download the repository, then with a terminal navigate to the repo folder
2. Run `docker build .`
3. Once the container is built, run `docker images` to get the IMAGE ID and include it in the following cmd: `docker run -it <IMAGE ID> sh`. This will allow you to interact with the active container
4. In the container shell run `npx playwright test --reporter=html` to run the automated tests

TODO: Integrate GitHub Actions for CI/CD test validation.
