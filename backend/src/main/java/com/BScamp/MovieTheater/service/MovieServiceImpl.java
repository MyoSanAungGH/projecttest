package com.BScamp.MovieTheater.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BScamp.MovieTheater.entity.Category;
import com.BScamp.MovieTheater.entity.Movie;
import com.BScamp.MovieTheater.repository.MovieRepo;

@Service
public class MovieServiceImpl implements MovieService {

	@Autowired
	MovieRepo movieRepo;

	@Override
	public Movie create(Movie movie) {
		movie.setCreatedAt(LocalDateTime.now());
		return movieRepo.save(movie);
	}

	@Override
	public Movie get(int id) {
		return movieRepo.findById(id).orElse(null);
	}

	@Override
	public List<Movie> getAll() {
		return movieRepo.findAll();
	}

	@Override
	public Movie update(int id, Movie movie) {
		Movie toUpdateMovie = this.get(id);
		if (toUpdateMovie == null) {
			return null;
		}
		toUpdateMovie.setTitle(movie.getTitle());
		toUpdateMovie.setBudget(movie.getBudget());
		toUpdateMovie.setOverview(movie.getOverview());
		toUpdateMovie.setCategory(movie.getCategory());
		toUpdateMovie.setAdult(movie.getAdult());
		toUpdateMovie.setPosterPath(movie.getPosterPath());
		toUpdateMovie.setTrailerPath(movie.getTrailerPath());
		toUpdateMovie.setUpdatedAt(LocalDateTime.now());
		movieRepo.save(toUpdateMovie);
		return toUpdateMovie;
	}

	@Override
	public boolean delete(int id) {
		Movie movie = this.get(id);
		if (movie == null) {
			return false;
		}
		movieRepo.deleteById(id);
		return true;
	}

	@Override
	public List<Movie> getAllByCategory(Category category) {
		return movieRepo.findByCategory(category);
	}

	@Override
	public Movie getByTitle(String title) {
		return movieRepo.findByTitle(title);
	}

}
