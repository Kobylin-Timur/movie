import Movie from './Movie.js';

describe('Movie', () => {
  let movie: Movie;

  beforeEach(() => {
    movie = new Movie(
      1,
      'Интерстеллар',
      499,
      'Джонатан Нолан',
      10140, // 169 минут
      'Кристофер Нолан',
      'США, Великобритания',
      2014,
      ['фантастика', 'драма', 'приключения'],
      8.6
    );
  });

  test('корректно создаётся с обязательными полями', () => {
    expect(movie.id).toBe(1);
    expect(movie.name).toBe('Интерстеллар');
    expect(movie.price).toBe(499);
    expect(movie.director).toBe('Кристофер Нолан');
  });

  test('корректно обрабатывает опциональный рейтинг', () => {
    const movieNoRating = new Movie(
      2, 'Фильм', 299, 'Автор', 5400,
      'Реж', 'Страна', 2020, ['драма']
    );
    expect(movieNoRating.rating).toBeUndefined();
  });

  test('formatDuration: форматирует минуты', () => {
    const shortMovie = new Movie(
      3, 'Короткий', 199, 'А', 900, // 15 минут
      'B', 'C', 2021, ['комедия']
    );
    const details = shortMovie.getDetails();
    expect(details).toContain('15м');
  });

  test('formatDuration: форматирует часы и минуты', () => {
    expect(movie.getDetails()).toContain('2ч 49м'); // 10140 сек = 169 мин = 2ч 49м
  });

  test('getDetails: включает все поля', () => {
    const details = movie.getDetails();
    expect(details).toContain('Интерстеллар');
    expect(details).toContain('фантастика, драма, приключения');
    expect(details).toContain('Кристофер Нолан');
    expect(details).toContain('Джонатан Нолан');
    expect(details).toContain('США, Великобритания');
    expect(details).toContain('2014');
    expect(details).toContain('499 ₽');
    expect(details).toContain('⭐ 8.6');
  });

  test('getDetails: не включает рейтинг, если он не задан', () => {
    const movieNoRating = new Movie(
      4, 'Без рейтинга', 199, 'А', 3600,
      'Р', 'С', 2022, ['боевик']
    );
    const details = movieNoRating.getDetails();
    expect(details).not.toContain('⭐');
  });

});