import css from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={css.loader}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};
