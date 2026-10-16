<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Match uploaded villa galleries by exact listing name, store photo pointers in `src/assets/villas`, and expose gallery URLs through a shared data manifest so covers and detail pages stay consistent.
- Keep villa photo interaction in `PropertyGallery` using the existing Button and Dialog controls so browsing stays accessible and separate from booking details.
