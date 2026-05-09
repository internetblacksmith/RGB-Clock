.DEFAULT_GOAL := menu

# Colors
CYAN    := \033[36m
GREEN   := \033[32m
YELLOW  := \033[33m
DIM     := \033[2m
BOLD    := \033[1m
RESET   := \033[0m

menu:
	@printf "\n"
	@printf "$(BOLD)$(CYAN)╔══════════════════════════════════════════════════════════════╗$(RESET)\n"
	@printf "$(BOLD)$(CYAN)║                  RGB Clock - Command Menu                    ║$(RESET)\n"
	@printf "$(BOLD)$(CYAN)╚══════════════════════════════════════════════════════════════╝$(RESET)\n"
	@printf "\n"
	@printf "  $(BOLD)$(GREEN)=== Development ===$(RESET)\n"
	@printf "   $(YELLOW)1)$(RESET)  make dev               $(DIM)Start Vite dev server (HMR)$(RESET)\n"
	@printf "   $(YELLOW)2)$(RESET)  make preview           $(DIM)Preview the production build$(RESET)\n"
	@printf "\n"
	@printf "  $(BOLD)$(GREEN)=== Testing ===$(RESET)\n"
	@printf "   $(YELLOW)3)$(RESET)  make test              $(DIM)Run unit tests (Vitest, headless)$(RESET)\n"
	@printf "   $(YELLOW)4)$(RESET)  make test-watch        $(DIM)Vitest in watch mode$(RESET)\n"
	@printf "   $(YELLOW)5)$(RESET)  make lint              $(DIM)Run ESLint$(RESET)\n"
	@printf "   $(YELLOW)6)$(RESET)  make lint-fix          $(DIM)Run ESLint with --fix$(RESET)\n"
	@printf "\n"
	@printf "  $(BOLD)$(GREEN)=== Build & Deploy ===$(RESET)\n"
	@printf "   $(YELLOW)7)$(RESET)  make build             $(DIM)Build for production into dist/$(RESET)\n"
	@printf "   $(YELLOW)8)$(RESET)  make clean             $(DIM)Remove dist/$(RESET)\n"
	@printf "\n"
	@printf "  $(BOLD)$(GREEN)=== Setup ===$(RESET)\n"
	@printf "   $(YELLOW)9)$(RESET)  make install           $(DIM)Install dependencies (yarn)$(RESET)\n"
	@printf "\n"
	@read -p "  Enter choice: " choice; \
	case $$choice in \
		1) $(MAKE) dev ;; \
		2) $(MAKE) preview ;; \
		3) $(MAKE) test ;; \
		4) $(MAKE) test-watch ;; \
		5) $(MAKE) lint ;; \
		6) $(MAKE) lint-fix ;; \
		7) $(MAKE) build ;; \
		8) $(MAKE) clean ;; \
		9) $(MAKE) install ;; \
		*) echo "Invalid choice" ;; \
	esac

dev:
	yarn dev

preview:
	yarn preview

test:
	yarn test

test-watch:
	yarn test:watch

lint:
	yarn lint

lint-fix:
	yarn lint:fix

build:
	yarn build

clean:
	rm -rf dist .vite

install:
	yarn install

help:
	@printf "\n"
	@printf "$(BOLD)Available commands:$(RESET)\n"
	@printf "\n"
	@printf "  $(CYAN)make dev$(RESET)               Start Vite dev server (HMR)\n"
	@printf "  $(CYAN)make preview$(RESET)           Preview the production build\n"
	@printf "  $(CYAN)make test$(RESET)              Run unit tests (Vitest, headless)\n"
	@printf "  $(CYAN)make test-watch$(RESET)        Vitest in watch mode\n"
	@printf "  $(CYAN)make lint$(RESET)              Run ESLint\n"
	@printf "  $(CYAN)make lint-fix$(RESET)          Run ESLint with --fix\n"
	@printf "  $(CYAN)make build$(RESET)             Build for production into dist/\n"
	@printf "  $(CYAN)make clean$(RESET)             Remove dist/\n"
	@printf "  $(CYAN)make install$(RESET)           Install dependencies (yarn)\n"
	@printf "\n"

list: help

.PHONY: menu dev preview test test-watch lint lint-fix build clean install help list
