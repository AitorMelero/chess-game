import { Link } from './Link'

export const Footer: React.FC = () => {
  return (
    <footer className="flex flex-row justify-center min-w-80">
      <Link
        name="LinkedIn"
        url="https://www.linkedin.com/in/aitor-melero-pic%C3%B3n-678105293/"
        svg="/assets/brand-linkedin.svg"
      />
      <Link
        name="GitHub"
        url="https://github.com/AitorMelero"
        svg="/assets/brand-github.svg"
      />
    </footer>
  )
}
